// models/Driver.ts

export class Driver {
  id: string;
  name: string;
  license: string;
  experience: string;
  phone?: string;
  email?: string;

  constructor(
    id: string,
    name: string,
    license: string,
    experience: string,
    phone?: string,
    email?: string,
  ) {
    this.id = id;
    this.name = name;
    this.license = license;
    this.experience = experience;
    this.phone = phone;
    this.email = email;
  }

  static createDriver(data: {
    name: string;
    license: string;
    experience: string;
    phone?: string;
    email?: string;
  }): Driver {
    const id = crypto.randomUUID();

    return new Driver(id, data.name, data.license, data.experience, data.phone, data.email);
  }
}

export default Driver;
