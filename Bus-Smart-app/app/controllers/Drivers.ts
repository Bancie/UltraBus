import drivers from '~/models/ModelDrivers';

export type DriverRecord = {
  id: number;
  name: string;
  license: string;
  phone: string;
  email: string;
  bus: string;
  route: string;
  status: string;
  experience: string;
  rating: number;
};

const defaultDrivers: DriverRecord[] = drivers;

export default class Driver {
  private drivers: DriverRecord[];

  constructor(initialDrivers: DriverRecord[] = defaultDrivers) {
    const source = Array.isArray(initialDrivers) ? initialDrivers : defaultDrivers;
    this.drivers = [...source];
  }

  getDrivers(): DriverRecord[] {
    return [...this.drivers];
  }

  getDriverbyId(id: number): DriverRecord | undefined {
    return this.drivers.find((route) => route.id === id);
  }

  addDriver(driver: DriverRecord): DriverRecord {
    const existingRoute = this.getDriverbyId(driver.id);

    if (existingRoute) {
      throw new Error(`Driver with id ${driver.id} already exists.`);
    }

    this.drivers.push(driver);
    return driver;
  }

  editDriver(id: number, updatedDriver: Partial<DriverRecord>): DriverRecord {
    const index = this.drivers.findIndex((driver) => driver.id === id);

    if (index === -1) {
      throw new Error(`Driver with id ${id} does not exist.`);
    }

    this.drivers[index] = {
      ...this.drivers[index],
      ...updatedDriver,
      id, // Ensure id is not changed
    };

    return this.drivers[index];
  }

  removeDriver(id: number): void {
    const index = this.drivers.findIndex((driver) => driver.id === id);

    if (index === -1) {
      throw new Error(`Driver with id ${id} does not exist.`);
    }

    this.drivers.splice(index, 1);
  }
}
