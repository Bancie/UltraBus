import { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import GoogleMapCard from '../map/GoogleMap';
import { buses } from '~/models/ModelBus';
import MapController from '~/controllers/MapController';
import AssignController from '~/controllers/AssignController';
import type { RouteDisplayData, MapMarker } from '~/controllers/MapController';
import type { Waypoint } from '~/controllers/AssignController';

type StopDisplay = {
  id: number;
  name: string;
  time: string;
  students: number;
  status?: 'completed' | 'current' | 'upcoming';
};

export default function RouteMap() {
  const mapControllerRef = useRef(new MapController());
  const assignControllerRef = useRef(new AssignController());
  const [selectedRouteData, setSelectedRouteData] = useState<RouteDisplayData | null>(null);
  const [carMarkerPosition, setCarMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    null,
  );
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [selectedRouteName, setSelectedRouteName] = useState<string>('');
  const [selectedBusName, setSelectedBusName] = useState<string>('');
  const [waypoints, setWaypoints] = useState<StopDisplay[]>([]);
  const [waypointsData, setWaypointsData] = useState<Waypoint[]>([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);

  // Helper function để tìm route ID từ route name
  const findRouteIdByName = (routeName: string): number | null => {
    const routes = assignControllerRef.current.getRoutes();
    // Tìm route bằng cách so sánh:
    // 1. Exact match
    // 2. Route name chứa routeName (ví dụ: "Tuyến A - Quận 1" chứa "Tuyến A")
    // 3. RouteName chứa phần đầu của route name (ví dụ: "Tuyến A" trong "Tuyến A - Quận 1")
    const route = routes.find((r) => {
      const routeBaseName = r.name.split(' - ')[0]; // Lấy phần "Tuyến A" từ "Tuyến A - Quận 1"
      return (
        r.name === routeName ||
        r.name.includes(routeName) ||
        routeName.includes(routeBaseName) ||
        routeBaseName === routeName
      );
    });
    return route?.id ?? null;
  };

  // Hàm tính khoảng cách giữa 2 điểm (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Bán kính Trái Đất (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách tính bằng km
  };

  // Kiểm tra xem xe đã đi qua waypoint tiếp theo chưa (đảm bảo tuần tự)
  const checkAndUpdateWaypointIndex = (
    carPosition: google.maps.LatLngLiteral,
    waypoints: Waypoint[],
    currentIndex: number,
  ): number => {
    if (waypoints.length === 0) return 0;
    if (currentIndex >= waypoints.length - 1) return currentIndex; // Đã đến cuối

    // Ngưỡng khoảng cách để coi như đã đi qua waypoint (300m = 0.3km)
    const thresholdDistance = 0.3;

    // Kiểm tra waypoint tiếp theo (currentIndex + 1)
    const nextWaypointIndex = currentIndex + 1;
    const nextWaypoint = waypoints[nextWaypointIndex];

    const distance = calculateDistance(
      carPosition.lat,
      carPosition.lng,
      nextWaypoint.lat,
      nextWaypoint.lng,
    );

    // Nếu đã đến gần waypoint tiếp theo, cập nhật currentIndex
    if (distance <= thresholdDistance) {
      return nextWaypointIndex;
    }

    // Nếu chưa đến waypoint tiếp theo, giữ nguyên currentIndex
    return currentIndex;
  };

  // Helper function để transform waypoints thành display format
  const transformWaypointsToStops = (
    waypoints: Waypoint[],
    currentIndex: number = 0,
  ): StopDisplay[] => {
    const baseTime = new Date();
    baseTime.setHours(7, 0, 0, 0); // Bắt đầu từ 7:00 AM

    return waypoints.map((waypoint, index) => {
      // Tính toán thời gian ước tính (mỗi điểm cách nhau khoảng 7 phút)
      const estimatedMinutes = index * 7;
      const stopTime = new Date(baseTime.getTime() + estimatedMinutes * 60000);
      const timeString = stopTime.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Xác định trạng thái
      let status: 'completed' | 'current' | 'upcoming' | undefined;
      if (index < currentIndex) {
        status = 'completed';
      } else if (index === currentIndex) {
        status = 'current';
      } else if (index === currentIndex + 1) {
        status = 'upcoming';
      }
      // Các waypoint còn lại không có trạng thái (undefined)

      // Số học sinh ước tính (random từ 5-10 cho mỗi điểm)
      // Sử dụng seed dựa trên waypoint id để đảm bảo giá trị không đổi
      const seed = waypoint.id * 1000;
      const students = (seed % 6) + 5;

      return {
        id: waypoint.id,
        name: waypoint.name,
        time: timeString,
        students,
        status,
      };
    });
  };

  // Handler cho button "Theo dõi xe"
  const handleTrackBus = (busRoute: string) => {
    try {
      const routeId = findRouteIdByName(busRoute);
      if (routeId === null) {
        console.error(`Không tìm thấy route ID cho: ${busRoute}`);
        return;
      }

      // Lấy thông tin route
      const route = assignControllerRef.current.getRouteById(routeId);
      if (!route) {
        console.error(`Không tìm thấy route với ID: ${routeId}`);
        return;
      }

      // Lấy waypoints
      const waypointsData = assignControllerRef.current.getWayPoints(routeId);
      if (waypointsData && waypointsData.length > 0) {
        setWaypointsData(waypointsData);
        // Khởi tạo với currentIndex = 0 (xe ở điểm đầu tiên)
        setCurrentWaypointIndex(0);
        const transformedStops = transformWaypointsToStops(waypointsData, 0);
        setWaypoints(transformedStops);
        setSelectedRouteId(routeId);
        setSelectedRouteName(route.name);
      } else {
        setWaypointsData([]);
        setWaypoints([]);
        setCurrentWaypointIndex(0);
        setSelectedRouteId(routeId);
        setSelectedRouteName(route.name);
      }

      // Tìm bus name từ route
      const bus = buses.find((b) => b.route === busRoute);
      if (bus) {
        setSelectedBusName(bus.name);
      } else {
        setSelectedBusName('Xe đang theo dõi');
      }

      const routeData = mapControllerRef.current.showRoute(routeId);
      setSelectedRouteData(routeData);

      // Bắt đầu tracking xe
      mapControllerRef.current.startTracking(routeId, (position) => {
        setCarMarkerPosition(position);
      });
    } catch (error) {
      console.error('Lỗi khi hiển thị route:', error);
    }
  };

  // Cập nhật trạng thái waypoints khi carMarkerPosition thay đổi (đảm bảo tuần tự)
  useEffect(() => {
    if (carMarkerPosition && waypointsData.length > 0) {
      setCurrentWaypointIndex((prevIndex) => {
        const newIndex = checkAndUpdateWaypointIndex(carMarkerPosition, waypointsData, prevIndex);

        // Chỉ cập nhật waypoints nếu index thay đổi
        if (newIndex !== prevIndex) {
          const updatedStops = transformWaypointsToStops(waypointsData, newIndex);
          setWaypoints(updatedStops);
        }

        return newIndex;
      });
    }
  }, [carMarkerPosition, waypointsData]);

  // Cleanup tracking khi component unmount
  useEffect(() => {
    return () => {
      mapControllerRef.current.stopTracking();
    };
  }, []);

  // Chỉ hiển thị route markers khi có route được chọn
  // Thêm carMarker nếu đang tracking
  const allMarkers: MapMarker[] = selectedRouteData ? [...selectedRouteData.markers] : [];

  if (carMarkerPosition && typeof window !== 'undefined' && window.google) {
    // Kiểm tra xem carMarker đã tồn tại chưa
    const existingCarMarkerIndex = allMarkers.findIndex((m) => m.id === 'car-marker');
    const carMarker: MapMarker = {
      id: 'car-marker',
      position: carMarkerPosition,
      title: 'Vị trí xe buýt',
      description: 'Xe đang di chuyển',
      icon: {
        url: '/bustopview.png',
        scaledSize: new google.maps.Size(30, 30),
        anchor: new google.maps.Point(15, 15),
      },
      zIndex: 1000, // Đảm bảo carMarker hiển thị trên các marker khác
    };

    if (existingCarMarkerIndex >= 0) {
      allMarkers[existingCarMarkerIndex] = carMarker;
    } else {
      allMarkers.push(carMarker);
    }
  }

  // Kết hợp polylines nếu có route được chọn
  const polylines = selectedRouteData ? [selectedRouteData.polyline] : [];

  // Tính toán center: ưu tiên route được chọn, sau đó là fallback center
  const mapCenter = selectedRouteData?.markers[0]?.position ?? { lat: 10.776889, lng: 106.700806 };

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
                zoom={selectedRouteData ? 13 : 12}
                markers={allMarkers}
                polylines={polylines}
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleTrackBus(bus.route)}
                  >
                    Theo dõi xe
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Stops */}
      {selectedRouteId && waypoints.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>{selectedBusName || 'Xe đang theo dõi'} - Điểm dừng sắp tới</CardTitle>
            <CardDescription>Lịch trình {selectedRouteName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {waypoints.map((stop, index) => (
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
                    {stop.status === 'upcoming' && <Badge className="bg-gray-500">Sắp đến</Badge>}
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
      )}
    </div>
  );
}
