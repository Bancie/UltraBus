const buses = [
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
  },
];

const upcomingStops = [
  {
    id: 1,
    name: '152 Lê Lợi',
    time: '7:05 AM',
    students: 8,
    status: 'completed',
  },
  {
    id: 2,
    name: 'Trường Đại học Sài Gòn',
    time: '7:12 AM',
    students: 6,
    status: 'completed',
  },
  {
    id: 3,
    name: '29 Bùi Thị Xuân',
    time: '7:18 AM',
    students: 9,
    status: 'current',
  },
  {
    id: 4,
    name: '62 Lê Hồng Phong',
    time: '7:25 AM',
    students: 7,
    status: 'upcoming',
  },
  {
    id: 5,
    name: '52 Bùi Viện',
    time: '7:32 AM',
    students: 5,
    status: 'upcoming',
  },
  {
    id: 6,
    name: '19 Trần Hưng Đạo',
    time: '7:45 AM',
    students: 45,
    status: 'upcoming',
  },
];

export { buses, upcomingStops };
