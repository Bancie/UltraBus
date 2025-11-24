import { students } from '~/models/ModelStudents';

export type StudentRecord = {
  id: number;
  name: string;
  grade: string;
  bus: string;
  route: string;
  pickup: string;
  dropoff: string;
  parent: string;
  phone: string;
  present: boolean;
};

const defaultStudents: StudentRecord[] = students;

export default class StudentsController {
  private students: StudentRecord[];

  constructor(initialStudents: StudentRecord[] = defaultStudents) {
    const source = Array.isArray(initialStudents) ? initialStudents : defaultStudents;
    this.students = [...source];
  }

  getStudents(): StudentRecord[] {
    return [...this.students];
  }

  getStudentById(id: number): StudentRecord | undefined {
    return this.students.find((student) => student.id === id);
  }

  addStudent(student: StudentRecord): StudentRecord {
    const existingStudent = this.getStudentById(student.id);

    if (existingStudent) {
      throw new Error(`Student with id ${student.id} already exists.`);
    }

    this.students.push(student);
    return student;
  }

  editStudent(id: number, updatedStudent: Partial<StudentRecord>): StudentRecord {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw new Error(`Student with id ${id} does not exist.`);
    }

    this.students[index] = {
      ...this.students[index],
      ...updatedStudent,
      id, // Ensure id is not changed
    };

    return this.students[index];
  }

  removeStudent(id: number): void {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw new Error(`Student with id ${id} does not exist.`);
    }

    this.students.splice(index, 1);
  }
}

// Keep the old HocSinh class for backward compatibility
import { PhuHuynh } from './Parents';

export class HocSinh {
  private maHS: string;
  private ten: string;
  private lop: string;
  private diaChi: string;
  private lichHoc: string;
  private phuHuynh?: PhuHuynh;

  constructor(maHS: string, ten: string, lop: string, diaChi: string, lichHoc: Date) {
    this.maHS = maHS;
    this.ten = ten;
    this.lop = lop;
    this.diaChi = diaChi;
    this.lichHoc = HocSinh.formatDate(lichHoc);
  }

  private static formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  static createHSinfo(ten: string, lop: string, diaChi: string, lichHoc: Date): HocSinh {
    const maHS = 'HS' + Math.floor(Math.random() * 10000);
    return new HocSinh(maHS, ten, lop, diaChi, lichHoc);
  }

  linkPH(tenPH: string, sdtPH: string): PhuHuynh {
    const phuHuynh = new PhuHuynh(this.maHS, tenPH, sdtPH);
    this.phuHuynh = phuHuynh;
    return phuHuynh;
  }
}
