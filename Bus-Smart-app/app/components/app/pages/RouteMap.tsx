import { MapPin, Navigation, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function RouteMap() {
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
      lat: 40.7128,
      lng: -74.006,
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
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      id: 3,
      name: 'Bus #24',
      route: 'Tuyến D - Quận 7',
      driver: 'Phạm Thu Hà',
      status: 'on-route',
      currentStop: '19 Nguyễn Văn Linh',
      eta: '6 mins',
      students: 48,
      speed: '32 km/h',
      lat: 40.7614,
      lng: -73.9776,
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Bản đồ tuyến đường và theo dõi</h1>
          <p className="text-gray-600">Theo dõi thời gian thực cho từng chuyến xe</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả tuyến đường</SelectItem>
              <SelectItem value="a">Tuyến A</SelectItem>
              <SelectItem value="b">Tuyến B</SelectItem>
              <SelectItem value="c">Tuyến C</SelectItem>
              <SelectItem value="d">Tuyến D</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Tải lại</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle>Bản đồ Trực tiếp</CardTitle>
            <CardDescription>Vị trí xe buýt hiện tại và tuyến đường đi</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Map Placeholder - Google Maps style */}
            <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                {/* Grid lines for map effect */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full h-px bg-gray-400"
                      style={{ top: `${i * 10}%` }}
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-gray-400"
                      style={{ left: `${i * 10}%` }}
                    />
                  ))}
                </div>

                {/* Bus Markers */}
                {buses.map((bus, index) => (
                  <div
                    key={bus.id}
                    className="absolute"
                    style={{
                      top: `${30 + index * 20}%`,
                      left: `${20 + index * 25}%`,
                    }}
                  >
                    <div className="relative group">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
                        <Navigation className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap">
                          <p className="text-gray-900">{bus.name}</p>
                          <p className="text-gray-600">{bus.currentStop}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Route Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 100 150 Q 250 100, 350 200 T 600 300"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                  <path
                    d="M 150 250 Q 300 200, 450 300 T 700 350"
                    stroke="#10B981"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    <span className="text-gray-700">Xe buýt hoạt động</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    <span className="text-gray-700">Điểm dừng</span>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <Button size="icon" variant="secondary" className="bg-white">
                    +
                  </Button>
                  <Button size="icon" variant="secondary" className="bg-white">
                    -
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Buses List */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Xe đang hoạt động</CardTitle>
              <CardDescription>3 xe đang trong tuyến</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {buses.map((bus) => (
                <div key={bus.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">{bus.name}</p>
                      <p className="text-gray-600">{bus.driver}</p>
                    </div>
                    <Badge className="bg-green-500">Hoạt động</Badge>
                  </div>
                  <div className="space-y-1.5 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{bus.currentStop}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Thời gian ước tính: {bus.eta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{bus.students} học sinh</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Theo dõi xe
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Stops */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Xe số 12 - Điểm dừng sắp tới</CardTitle>
          <CardDescription>Lịch trình tuyến A - Quận 1</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingStops.map((stop, index) => (
              <div
                key={stop.id}
                className={`p-4 rounded-lg border-2 ${
                  stop.status === 'current'
                    ? 'border-blue-500 bg-blue-50'
                    : stop.status === 'completed'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stop.status === 'current'
                          ? 'bg-blue-600 text-white'
                          : stop.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-900">{stop.name}</p>
                      <p className="text-gray-600">{stop.time}</p>
                    </div>
                  </div>
                  {stop.status === 'current' && <Badge className="bg-blue-600">Hiện tại</Badge>}
                  {stop.status === 'completed' && (
                    <Badge className="bg-green-600">Đã hoàn thành</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{stop.students} học sinh</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
