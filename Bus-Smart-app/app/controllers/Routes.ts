import routes from '~/models/ModelRoutes';

export type Waypoint = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

export type RouteRecord = {
  id: number;
  name: string;
  stops: number;
  distance: string;
  avgTime: string;
  buses: number;
  wayPoints?: Waypoint[];
};

export const defaultRoutes: RouteRecord[] = routes;

export default class Routes {
  private routes: RouteRecord[];

  constructor(initialRoutes: RouteRecord[] = defaultRoutes) {
    const source = Array.isArray(initialRoutes) ? initialRoutes : defaultRoutes;
    this.routes = [...source];
  }

  getRoutes(): RouteRecord[] {
    return [...this.routes];
  }

  getRouteById(id: number): RouteRecord | undefined {
    return this.routes.find((route) => route.id === id);
  }

  addRoute(route: RouteRecord): RouteRecord {
    const existingRoute = this.getRouteById(route.id);

    if (existingRoute) {
      throw new Error(`Route with id ${route.id} already exists.`);
    }

    this.routes.push(route);
    return route;
  }

  editRoute(id: number, updatedRoute: Partial<RouteRecord>): RouteRecord {
    const index = this.routes.findIndex((route) => route.id === id);

    if (index === -1) {
      throw new Error(`Route with id ${id} does not exist.`);
    }

    this.routes[index] = {
      ...this.routes[index],
      ...updatedRoute,
      id, // Ensure id is not changed
    };

    return this.routes[index];
  }

  removeRoute(id: number): void {
    const index = this.routes.findIndex((route) => route.id === id);

    if (index === -1) {
      throw new Error(`Route with id ${id} does not exist.`);
    }

    this.routes.splice(index, 1);
  }

  // Waypoints

  getWayPoints(id: number): Waypoint[] | undefined {
    return this.routes.find((route) => route.id === id)?.wayPoints;
  }
}
