import Routes from './Routes';
import type { RouteRecord, Waypoint } from './Routes';

export type MapPolyline = {
  id: string | number;
  path: google.maps.LatLngLiteral[];
  options?: google.maps.PolylineOptions;
};

export type MapMarker = {
  id: string | number;
  position: google.maps.LatLngLiteral;
  title?: string;
  description?: string;
  label?: string;
  iconColor?: string;
  icon?: google.maps.Icon | google.maps.Symbol;
  zIndex?: number;
};

export type RouteDisplayData = {
  route: RouteRecord;
  polyline: MapPolyline;
  markers: MapMarker[];
};

export default class MapController {
  private routesController: Routes;
  private currentRouteId: number | null = null;
  private currentRoutePath: google.maps.LatLngLiteral[] = [];
  private trackingStartTime: number = 0;
  private trackingInterval: NodeJS.Timeout | null = null;
  private currentPosition: google.maps.LatLngLiteral | null = null;
  private velocity: number = 40; // km/h
  private onPositionUpdate: ((position: google.maps.LatLngLiteral) => void) | null = null;

  constructor(routesController: Routes = new Routes()) {
    this.routesController = routesController;
  }

  showRoute(routeId: number): RouteDisplayData {
    const route = this.routesController.getRouteById(routeId);

    if (!route) {
      throw new Error(`Route with id ${routeId} not found.`);
    }

    const waypoints = this.routesController.getWayPoints(routeId);

    if (!waypoints || waypoints.length === 0) {
      throw new Error(`Route with id ${routeId} has no waypoints.`);
    }

    const polylinePath: google.maps.LatLngLiteral[] = waypoints.map((wp) => ({
      lat: wp.lat,
      lng: wp.lng,
    }));

    const polyline: MapPolyline = {
      id: `route-${routeId}`,
      path: polylinePath,
      options: {
        strokeColor: '#3b82f6',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        geodesic: true,
      },
    };

    const markers: MapMarker[] = waypoints.map((wp, index) => ({
      id: `waypoint-${routeId}-${wp.id}`,
      position: { lat: wp.lat, lng: wp.lng },
      title: wp.name,
      description: `Điểm dừng ${index + 1} của ${route.name}`,
      label: String(index + 1),
      iconColor: '#ef4444',
    }));

    return {
      route,
      polyline,
      markers,
    };
  }

  /**
   * Tính vị trí hiện tại của xe dựa trên quãng đường đã đi
   * Sử dụng công thức đơn giản: s = v * t (quãng đường = vận tốc * thời gian)
   * @param routeId ID của tuyến đường
   * @param elapsedTime Thời gian đã trôi qua tính bằng giây
   * @returns Vị trí GPS hiện tại của xe
   */
  getStretchOfRoad(routeId: number, elapsedTime: number): google.maps.LatLngLiteral {
    const waypoints = this.routesController.getWayPoints(routeId);
    if (!waypoints || waypoints.length === 0) {
      throw new Error(`Route with id ${routeId} has no waypoints.`);
    }

    const path: google.maps.LatLngLiteral[] = waypoints.map((wp) => ({
      lat: wp.lat,
      lng: wp.lng,
    }));

    // Tính quãng đường đã đi: s = v * t
    // Vận tốc (km/h) * thời gian (giờ) = quãng đường (km)
    const distanceTraveled = (this.velocity * elapsedTime) / 3600;

    // Ước tính tổng quãng đường dựa trên số đoạn (mỗi đoạn ~1km)
    // Đơn giản hóa: giả sử mỗi đoạn giữa 2 waypoint có độ dài tương đương
    const numberOfSegments = path.length - 1;
    const estimatedSegmentLength = 1; // km (ước tính mỗi đoạn ~1km)
    const totalEstimatedDistance = numberOfSegments * estimatedSegmentLength;

    // Tính tỷ lệ tiến trình (0 đến 1)
    const progress = Math.min(distanceTraveled / totalEstimatedDistance, 1);

    // Tính số đoạn đã đi qua
    const segmentsTraveled = progress * numberOfSegments;
    const currentSegmentIndex = Math.floor(segmentsTraveled);
    const segmentProgress = segmentsTraveled - currentSegmentIndex;

    // Nếu đã đến cuối tuyến đường, trả về điểm cuối
    if (currentSegmentIndex >= numberOfSegments) {
      return path[path.length - 1];
    }

    // Nội suy vị trí trong đoạn hiện tại
    const startPoint = path[currentSegmentIndex];
    const endPoint = path[currentSegmentIndex + 1];

    return {
      lat: startPoint.lat + (endPoint.lat - startPoint.lat) * segmentProgress,
      lng: startPoint.lng + (endPoint.lng - startPoint.lng) * segmentProgress,
    };
  }

  /**
   * Lấy vị trí GPS hiện tại của carMarker
   * @returns Vị trí GPS hiện tại hoặc null nếu chưa bắt đầu tracking
   */
  getCurrentGPT(): google.maps.LatLngLiteral | null {
    return this.currentPosition;
  }

  /**
   * Bắt đầu theo dõi xe trên tuyến đường
   * @param routeId ID của tuyến đường
   * @param onUpdate Callback được gọi mỗi khi vị trí được cập nhật
   */
  startTracking(routeId: number, onUpdate?: (position: google.maps.LatLngLiteral) => void): void {
    // Dừng tracking hiện tại nếu có
    this.stopTracking();

    const waypoints = this.routesController.getWayPoints(routeId);
    if (!waypoints || waypoints.length === 0) {
      throw new Error(`Route with id ${routeId} has no waypoints.`);
    }

    this.currentRouteId = routeId;
    this.currentRoutePath = waypoints.map((wp) => ({
      lat: wp.lat,
      lng: wp.lng,
    }));
    this.trackingStartTime = Date.now();
    this.onPositionUpdate = onUpdate || null;

    // Đặt vị trí ban đầu là waypoint đầu tiên
    this.currentPosition = {
      lat: waypoints[0].lat,
      lng: waypoints[0].lng,
    };

    if (onUpdate) {
      onUpdate(this.currentPosition);
    }

    // Cập nhật vị trí mỗi giây (1000ms)
    this.trackingInterval = setInterval(() => {
      if (this.currentRouteId === null) {
        return;
      }

      const elapsedTime = (Date.now() - this.trackingStartTime) / 300; // Chuyển sang giây
      const newPosition = this.getStretchOfRoad(this.currentRouteId, elapsedTime);
      this.currentPosition = newPosition;

      if (this.onPositionUpdate) {
        this.onPositionUpdate(newPosition);
      }
    }, 300);
  }

  /**
   * Dừng theo dõi xe
   */
  stopTracking(): void {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
    this.currentRouteId = null;
    this.currentRoutePath = [];
    this.trackingStartTime = 0;
    this.onPositionUpdate = null;
  }

  /**
   * Thiết lập vận tốc mặc định (km/h)
   * @param velocity Vận tốc tính bằng km/h
   */
  setVelocity(velocity: number): void {
    this.velocity = velocity;
  }

  /**
   * Lấy vận tốc hiện tại
   * @returns Vận tốc tính bằng km/h
   */
  getVelocity(): number {
    return this.velocity;
  }
}
