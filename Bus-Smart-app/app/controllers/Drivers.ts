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
    email?: string
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

    return new Driver(
      id,
      data.name,
      data.license,
      data.experience,
      data.phone,
      data.email
    );
  }
}


const newDriver = Driver.createDriver({
    id: "1",
  name: 'Khoi Dz',
  license: 'B2-123456',
  experience: '3 năm',
  phone: '0901234567',
  email: 'khoidz@example.com',
});
const cute = new Driver(
  "1",
  "Khoi Dz",
  "B2-123456",
  "3 năm",
  "0901234567",
  "khoidz@example.com"
);
console.log(cute);
