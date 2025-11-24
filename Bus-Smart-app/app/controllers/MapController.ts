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
   * Tính khoảng cách giữa hai điểm GPS (Haversine formula)
   * @param point1 Điểm GPS đầu tiên
   * @param point2 Điểm GPS thứ hai
   * @returns Khoảng cách tính bằng km
   */
  private calculateDistance(
    point1: google.maps.LatLngLiteral,
    point2: google.maps.LatLngLiteral,
  ): number {
    const R = 6371; // Bán kính Trái Đất (km)
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Tính tổng khoảng cách của toàn bộ tuyến đường
   * @param path Mảng các điểm GPS của tuyến đường
   * @returns Tổng khoảng cách tính bằng km
   */
  private calculateTotalDistance(path: google.maps.LatLngLiteral[]): number {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += this.calculateDistance(path[i], path[i + 1]);
    }
    return totalDistance;
  }

  /**
   * Tính vị trí hiện tại của xe dựa trên quãng đường đã đi
   * Sử dụng công thức: quãng đường = vận tốc * thời gian
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

    // Tính quãng đường đã đi (km) = vận tốc (km/h) * thời gian (giờ)
    const distanceTraveled = (this.velocity * elapsedTime) / 3600; // Chuyển giây sang giờ

    // Tính tổng khoảng cách của tuyến đường
    let totalDistance = 0;
    const segmentDistances: number[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const segmentDistance = this.calculateDistance(path[i], path[i + 1]);
      segmentDistances.push(segmentDistance);
      totalDistance += segmentDistance;
    }

    // Nếu quãng đường đã đi vượt quá tổng khoảng cách, trả về điểm cuối
    if (distanceTraveled >= totalDistance) {
      return path[path.length - 1];
    }

    // Tìm đoạn đường mà xe đang ở
    let accumulatedDistance = 0;
    for (let i = 0; i < segmentDistances.length; i++) {
      const segmentDistance = segmentDistances[i];
      if (distanceTraveled <= accumulatedDistance + segmentDistance) {
        // Xe đang ở trong đoạn này
        const remainingDistance = distanceTraveled - accumulatedDistance;
        const ratio = remainingDistance / segmentDistance;

        // Nội suy vị trí trong đoạn đường
        const startPoint = path[i];
        const endPoint = path[i + 1];
        return {
          lat: startPoint.lat + (endPoint.lat - startPoint.lat) * ratio,
          lng: startPoint.lng + (endPoint.lng - startPoint.lng) * ratio,
        };
      }
      accumulatedDistance += segmentDistance;
    }

    // Fallback: trả về điểm cuối
    return path[path.length - 1];
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
