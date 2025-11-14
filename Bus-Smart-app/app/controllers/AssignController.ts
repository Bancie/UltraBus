import Routes, { type RouteRecord } from './Routes';
import Driver, { type DriverRecord } from './Drivers';
import Bus, { type BusRecord } from './Buses';
import phancong from '~/models/ModelAsign';

export type AssignRecord = {
  id: number;
  bus: string;
  driver: string;
  route: string;
  students: number;
  status: string;
  schedule: Date;
};

const defaultAssign: AssignRecord[] = phancong;

export default class AssignController {
  private assignments: AssignRecord[];
  private routesController: Routes;
  private driverController: Driver;
  private busController: Bus;

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

  // Routes

  getRoutes(): RouteRecord[] {
    return this.routesController.getRoutes();
  }

  getRouteById(id: number): RouteRecord | undefined {
    return this.routesController.getRouteById(id);
  }

  // Drivers

  getDrivers(): DriverRecord[] {
    return this.driverController.getDrivers();
  }

  getDriverById(id: number): DriverRecord | undefined {
    return this.driverController.getDriverbyId(id);
  }

  // Schedule

  getSchedule(): AssignRecord[] {
    return [...this.assignments];
  }

  getScheduleById(id: number): AssignRecord | undefined {
    return this.assignments.find((source) => source.id === id);
  }

  // Bus

  getBus(): BusRecord[] {
    return this.busController.getBus();
  }

  getBusById(id: number): BusRecord | undefined {
    return this.busController.getBusbyId(id);
  }
}
