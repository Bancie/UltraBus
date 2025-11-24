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
};

export type RouteDisplayData = {
  route: RouteRecord;
  polyline: MapPolyline;
  markers: MapMarker[];
};

export default class MapController {
  private routesController: Routes;

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

  getCurrentGPT() {}
}
