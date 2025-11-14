import routes from '~/models/ModelRoutes';

export type RouteRecord = {
  id: number;
  name: string;
  stops: number;
  distance: string;
  avgTime: string;
  buses: number;
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
}
