import Routes, { type RouteRecord } from './Routes';
import Driver, { type DriverRecord } from './Drivers';
import Bus, { type BusRecord } from './Buses';

export type AssignRecord = {
  id: number;
  bus: string;
  driver: string;
  route: string;
  students: number;
  status: string;
  schedule: Date;
};

const defaultAssign: AssignRecord[] = [
  {
    id: 1,
    bus: 'Xe số 12',
    driver: 'Nguyễn Văn An',
    route: 'Tuyến A',
    students: 45,
    status: 'hoạt động',
    schedule: new Date('2024-07-01T07:15:00+07:00'),
  },
  {
    id: 2,
    bus: 'Xe số 07',
    driver: 'Trần Thị Bích',
    route: 'Tuyến B',
    students: 52,
    status: 'hoạt động',
    schedule: new Date('2024-07-01T07:30:00+07:00'),
  },
  {
    id: 3,
    bus: 'Xe số 19',
    driver: 'Lê Minh Khang',
    route: 'Tuyến C',
    students: 38,
    status: 'bảo trì',
    schedule: new Date('2024-07-01T08:00:00+07:00'),
  },
  {
    id: 4,
    bus: 'Xe số 24',
    driver: 'Phạm Thu Hà',
    route: 'Tuyến D',
    students: 48,
    status: 'hoạt động',
    schedule: new Date('2024-07-01T08:15:00+07:00'),
  },
  {
    id: 5,
    bus: 'Xe số 05',
    driver: 'Đỗ Quang Huy',
    route: 'Tuyến A',
    students: 41,
    status: 'hoạt động',
    schedule: new Date('2024-07-01T09:00:00+07:00'),
  },
];

export default class AssignController {
  private assignments: AssignRecord[];
  private readonly routesController: Routes;
  private readonly driverController: Driver;
  private readonly busController: Bus;

  constructor(
    initialAssign: AssignRecord[] = defaultAssign,
    initialRoutes: RouteRecord[] = [],
    initialDrivers: DriverRecord[] = [],
    initialBus: BusRecord[] = [],
  ) {
    const assignSource = Array.isArray(initialAssign) ? initialAssign : defaultAssign;
    const routeSource = Array.isArray(initialRoutes) ? initialRoutes : [];
    const driverSource = Array.isArray(initialDrivers) ? initialDrivers : [];
    const busSource = Array.isArray(initialBus) ? initialBus : [];

    this.assignments = [...assignSource];
    this.routesController = new Routes(routeSource.length ? routeSource : undefined);
    this.driverController = new Driver(driverSource.length ? driverSource : undefined);
    this.busController = new Bus(busSource.length ? busSource : undefined);
  }

  getAssign(): AssignRecord[] {
    return [...this.assignments];
  }

  getAssignById(id: number): AssignRecord | undefined {
    return this.assignments.find((source) => source.id === id);
  }

  addAssign(assign: AssignRecord): AssignRecord {
    const existingAssign = this.getAssignById(assign.id);

    if (existingAssign) {
      throw new Error(`Route with id ${assign.id} already exists.`);
    }

    this.assignments.push(assign);
    return assign;
  }

  getRoutes(): RouteRecord[] {
    return this.routesController.getRoutes();
  }

  getRouteById(id: number): RouteRecord | undefined {
    return this.routesController.getRouteById(id);
  }

  getDrivers(): DriverRecord[] {
    return this.driverController.getDrivers();
  }

  getDriverById(id: number): DriverRecord | undefined {
    return this.driverController.getDriverbyId(id);
  }

  getSchedule(): AssignRecord[] {
    return [...this.assignments];
  }

  getScheduleById(id: number): AssignRecord | undefined {
    return this.assignments.find((source) => source.id === id);
  }

  getBus(): BusRecord[] {
    return this.busController.getBus();
  }

  getBusById(id: number): BusRecord | undefined {
    return this.busController.getBusbyId(id);
  }
}
