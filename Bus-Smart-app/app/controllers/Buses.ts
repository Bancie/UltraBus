import { buses } from '~/models/ModelBus';

export type BusRecord = {
  id: number;
  name: string;
  route: string;
  driver: string;
  currentStop: string;
  status: string;
  eta: string;
  students: number;
  speed: string;
  lat: number;
  lng: number;
};

const defaultBuses: BusRecord[] = buses;

export default class Bus {
  private buses: BusRecord[];

  constructor(initialDrivers: BusRecord[] = defaultBuses) {
    const source = Array.isArray(initialDrivers) ? initialDrivers : defaultBuses;
    this.buses = [...source];
  }

  getBus(): BusRecord[] {
    return [...this.buses];
  }

  getBusbyId(id: number): BusRecord | undefined {
    return this.buses.find((route) => route.id === id);
  }

  addBus(bus: BusRecord): BusRecord {
    const existingRoute = this.getBusbyId(bus.id);

    if (existingRoute) {
      throw new Error(`Driver with id ${bus.id} already exists.`);
    }

    this.buses.push(bus);
    return bus;
  }

  getBusName(): string[] {
    return this.buses.map((bus) => bus.name);
  }

  getBusNameById(id: number): string | undefined {
    return this.getBusbyId(id)?.name;
  }
}
