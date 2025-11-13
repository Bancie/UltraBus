// models/Driver.ts

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

const defaultDrivers: DriverRecord[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    license: 'DL-28475',
    phone: '+ 84 919 832 446',
    email: 'nguyen.van.an@busmart.com',
    bus: 'Xe số 12',
    route: 'Tuyến A - Quận 1',
    status: 'đang thực hiện',
    experience: '8 năm',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Trần Thị Bích',
    license: 'DL-39284',
    phone: '+ 84 919 832 447',
    email: 'tran.thi.bich@busmart.com',
    bus: 'Xe số 07',
    route: 'Tuyến B - Quận 10',
    status: 'đang thực hiện',
    experience: '5 năm',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Lê Minh Khang',
    license: 'DL-47392',
    phone: '+ 84 919 832 423',
    email: 'le.minh.khang@busmart.com',
    bus: 'Xe số 19',
    route: 'Tuyến C - Quận 3',
    status: 'chưa phân công',
    experience: '12 năm',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Phạm Thu Hà',
    license: 'DL-56283',
    phone: '+ 84 919 782 142',
    email: 'pham.thu.ha@busmart.com',
    bus: 'Xe số 24',
    route: 'Tuyến D - Quận 7',
    status: 'đang thực hiện',
    experience: '6 năm',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Đỗ Quang Huy',
    license: 'DL-61847',
    phone: '+ 84 124 234 333',
    email: 'do.quang.huy@busmart.com',
    bus: 'Xe số 05',
    route: 'Tuyến A - Quận 1',
    status: 'đang thực hiện',
    experience: '10 năm',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Hoàng Lan Anh',
    license: 'DL-72938',
    phone: '+ 84 453 009 113',
    email: 'hoang.lan.anh@busmart.com',
    bus: 'Xe số 15',
    route: 'Tuyến B - Quận 10',
    status: 'chưa phân công',
    experience: '4 năm',
    rating: 4.6,
  },
];

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
}
