type RouteRecord = {
  id: number;
  name: string;
  stops: number;
  distance: string;
  avgTime: string;
};

const defaultRoutes: RouteRecord[] = [
  {
    id: 1,
    name: 'Tuyến A - Quận 1',
    stops: 12,
    distance: '18.5 km',
    avgTime: '45 min',
  },
  {
    id: 2,
    name: 'Tuyến B - Quận 10',
    stops: 15,
    distance: '22.3 km',
    avgTime: '52 min',
  },
  {
    id: 3,
    name: 'Tuyến C - Quận 3',
    stops: 10,
    distance: '15.8 km',
    avgTime: '38 min',
  },
  {
    id: 4,
    name: 'Tuyến D - Quận 7',
    stops: 14,
    distance: '20.1 km',
    avgTime: '48 min',
  },
];

export default class RoutesController {
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

const controller = new RoutesController([
  { id: 1, name: 'Tuyến A - Quận 1', stops: 12, distance: '18.5 km', avgTime: '45 min' },
]);
console.log(controller.getRoutes());

controller.addRoute({
  id: 99,
  name: 'Tuyến thử nghiệm',
  stops: 8,
  distance: '12 km',
  avgTime: '30 min',
});

console.log('Sau khi thêm:', controller.getRoutes());
