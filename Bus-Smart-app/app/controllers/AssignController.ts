import { create } from 'domain';
import RoutesController from './Routes';

export type AssignRecord = {
  id: number;
  bus: string;
  driver: string;
  route: string;
  students: number;
  status: string;
};

const defaultAssign: AssignRecord[] = [
  {
    id: 1,
    bus: 'Xe số 12',
    driver: 'Nguyễn Văn An',
    route: 'Tuyến A',
    students: 45,
    status: 'hoạt động',
  },
  {
    id: 2,
    bus: 'Xe số 07',
    driver: 'Trần Thị Bích',
    route: 'Tuyến B',
    students: 52,
    status: 'hoạt động',
  },
  {
    id: 3,
    bus: 'Xe số 19',
    driver: 'Lê Minh Khang',
    route: 'Tuyến C',
    students: 38,
    status: 'bảo trì',
  },
  {
    id: 4,
    bus: 'Xe số 24',
    driver: 'Phạm Thu Hà',
    route: 'Tuyến D',
    students: 48,
    status: 'hoạt động',
  },
  {
    id: 5,
    bus: 'Xe số 05',
    driver: 'Đỗ Quang Huy',
    route: 'Tuyến A',
    students: 41,
    status: 'hoạt động',
  },
];

export default class AssignController extends RoutesController {
  private assignments: AssignRecord[];

  constructor(initialRoutes: AssignRecord[] = defaultAssign) {
    super();
    const source = Array.isArray(initialRoutes) ? initialRoutes : defaultAssign;
    this.assignments = [...source];
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
}
