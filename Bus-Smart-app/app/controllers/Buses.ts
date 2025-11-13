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

const defaultBuses: BusRecord[] = [
  {
    id: 1,
    name: 'Xe số 12',
    route: 'Tuyến A - Quận 1',
    driver: 'Nguyễn Văn An',
    status: 'on-route',
    currentStop: '69 Lê Lợi',
    eta: '8 mins',
    students: 45,
    speed: '35 km/h',
    lat: 10.7739,
    lng: 106.6999,
  },
  {
    id: 2,
    name: 'Xe số 07',
    route: 'Tuyến B - Quận 10',
    driver: 'Trần Thị Bích',
    status: 'on-route',
    currentStop: '92 Ngô Gia Tự',
    eta: '12 mins',
    students: 52,
    speed: '40 km/h',
    lat: 10.7648,
    lng: 106.6661,
  },
  {
    id: 3,
    name: 'Xe số 24',
    route: 'Tuyến D - Quận 7',
    driver: 'Phạm Thu Hà',
    status: 'on-route',
    currentStop: '19 Nguyễn Văn Linh',
    eta: '6 mins',
    students: 48,
    speed: '32 km/h',
    lat: 10.7324,
    lng: 106.7053,
  },
];

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
