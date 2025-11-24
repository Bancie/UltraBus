import { MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import GoogleMapCard from '../map/GoogleMap';
import { buses, upcomingStops } from '~/models/ModelBus';

export default function RouteMap() {
  const busMarkers = buses.map((bus) => ({
    id: bus.id,
    position: { lat: bus.lat, lng: bus.lng },
    title: bus.name,
    description: `${bus.route} - ${bus.currentStop}`,
  }));

  const mapCenter = busMarkers[0].position;

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
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <GoogleMapCard
                variant="embed"
                height={500}
                center={mapCenter}
                zoom={12}
                markers={busMarkers}
              />
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
