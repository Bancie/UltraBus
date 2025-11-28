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
  private velocity: number = 200; // km/h
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

  getStretchOfRoad(routeId: number, elapsedTime: number): google.maps.LatLngLiteral {
    const waypoints = this.routesController.getWayPoints(routeId);
    if (!waypoints || waypoints.length === 0) {
      throw new Error(`Route with id ${routeId} has no waypoints.`);
    }

    const path: google.maps.LatLngLiteral[] = waypoints.map((wp) => ({
      lat: wp.lat,
      lng: wp.lng,
    }));

    const distanceTraveled = (this.velocity * elapsedTime) / 3600;

    const numberOfSegments = path.length - 1;
    const estimatedSegmentLength = 1; // km (ước tính mỗi đoạn ~1km)
    const totalEstimatedDistance = numberOfSegments * estimatedSegmentLength;

    const progress = Math.min(distanceTraveled / totalEstimatedDistance, 1);

    const segmentsTraveled = progress * numberOfSegments;
    const currentSegmentIndex = Math.floor(segmentsTraveled);
    const segmentProgress = segmentsTraveled - currentSegmentIndex;

    if (currentSegmentIndex >= numberOfSegments) {
      return path[path.length - 1];
    }

    const startPoint = path[currentSegmentIndex];
    const endPoint = path[currentSegmentIndex + 1];

    return {
      lat: startPoint.lat + (endPoint.lat - startPoint.lat) * segmentProgress,
      lng: startPoint.lng + (endPoint.lng - startPoint.lng) * segmentProgress,
    };
  }

  getCurrentGPT(): google.maps.LatLngLiteral | null {
    return this.currentPosition;
  }

  startTracking(routeId: number, onUpdate?: (position: google.maps.LatLngLiteral) => void): void {
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

    this.currentPosition = {
      lat: waypoints[0].lat,
      lng: waypoints[0].lng,
    };

    if (onUpdate) {
      onUpdate(this.currentPosition);
    }

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

  setVelocity(velocity: number): void {
    this.velocity = velocity;
  }

  getVelocity(): number {
    return this.velocity;
  }
}
