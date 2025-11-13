import { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import GoogleMapCard from '../map/GoogleMap';
import BusTrackingController, {
  type BusTrackingSnapshot,
  type RouteStop,
  type RouteStopProvider,
} from '~/controllers/BusTrackingController';
import routes from '~/models/ModelRoutes';
import { buses, upcomingStops } from '~/models/ModelBus';

type StopStatus = 'completed' | 'current' | 'upcoming';

type StopMeta = RouteStop & {
  students: number;
  displayTime: string;
  status: StopStatus;
};

type UpcomingStopCard = StopMeta & {
  etaMinutes: number;
  distanceMeters: number;
};

const DEFAULT_CENTER = { lat: 10.776, lng: 106.7 };

const routeNameToId = new Map(routes.map((route) => [route.name, route.id]));

const stopMetaByRoute = new Map<number, StopMeta[]>();

buses.forEach((bus) => {
  const routeId = routeNameToId.get(bus.route) ?? bus.id;
  const stops = upcomingStops.map<StopMeta>((stop, index) => ({
    stopId: `${routeId}-${stop.id}`,
    name: stop.name,
    position: {
      lat: bus.lat + index * 0.002,
      lng: bus.lng + index * 0.0015,
    },
    sequence: index,
    etaOffsetMinutes: index * 6,
    students: stop.students,
    displayTime: stop.time,
    status: stop.status as StopStatus,
  }));

  stopMetaByRoute.set(routeId, stops);
});

const stopMetaById = new Map<string, StopMeta>();
stopMetaByRoute.forEach((stops) =>
  stops.forEach((stop) => {
    stopMetaById.set(stop.stopId, stop);
  }),
);

const stopProvider: RouteStopProvider = {
  getStopsForRoute(routeId: number) {
    return (stopMetaByRoute.get(routeId) ?? []).map((stop) => {
      const { students, displayTime, status, ...rest } = stop;
      return rest;
    });
  },
};

const busMetaById = new Map<string, (typeof buses)[number]>();
buses.forEach((bus) => busMetaById.set(String(bus.id), bus));

const fallbackSnapshots: BusTrackingSnapshot[] = buses.map((bus) => {
  const routeId = routeNameToId.get(bus.route) ?? bus.id;

  return {
    busId: String(bus.id),
    routeId,
    driverId: bus.driver,
    status: 'enRoute',
    lastPosition: { lat: bus.lat, lng: bus.lng },
    lastUpdatedAt: Date.now(),
    nextStopIndex: 0,
    stops: stopProvider.getStopsForRoute(routeId),
  };
});

const parseSpeed = (value: string): number => {
  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 30;
};

export default function RouteMap() {
  const trackingControllerRef = useRef<BusTrackingController | null>(null);
  const seededRef = useRef(false);

  if (!trackingControllerRef.current) {
    trackingControllerRef.current = new BusTrackingController(stopProvider);
  }

  const [activeBuses, setActiveBuses] = useState<BusTrackingSnapshot[]>(fallbackSnapshots);
  const [selectedBusId, setSelectedBusId] = useState<string>(fallbackSnapshots[0]?.busId ?? '');
  const [upcomingStopCards, setUpcomingStopCards] = useState<UpcomingStopCard[]>([]);

  const refreshUpcomingStops = useCallback(async (busId: string) => {
    if (!busId) {
      setUpcomingStopCards([]);
      return;
    }

    const controller = trackingControllerRef.current;

    if (!controller) {
      return;
    }

    try {
      const stops = await controller.getUpcomingStops(busId, 4);
      const cards = stops
        .map((stop) => {
          const meta = stopMetaById.get(stop.stopId);

          if (!meta) {
            return null;
          }

          return {
            ...meta,
            etaMinutes: stop.etaMinutes,
            distanceMeters: stop.distanceMeters,
          };
        })
        .filter((entry): entry is UpcomingStopCard => Boolean(entry));

      setUpcomingStopCards(cards);
    } catch (error) {
      setUpcomingStopCards([]);
    }
  }, []);

  useEffect(() => {
    if (seededRef.current) {
      return;
    }

    const controller = trackingControllerRef.current;

    if (!controller) {
      return;
    }

    buses.forEach((bus) => {
      const routeId = routeNameToId.get(bus.route) ?? bus.id;

      controller.startTracking({
        busId: String(bus.id),
        routeId,
        driverId: bus.driver,
        position: {
          lat: bus.lat,
          lng: bus.lng,
          speedKmh: parseSpeed(bus.speed),
        },
        stops: stopProvider.getStopsForRoute(routeId),
      });
    });

    setActiveBuses(controller.listActiveBuses());
    seededRef.current = true;
  }, []);

  useEffect(() => {
    void refreshUpcomingStops(selectedBusId);
  }, [selectedBusId, refreshUpcomingStops]);

  const handleReload = () => {
    const controller = trackingControllerRef.current;

    if (!controller) {
      return;
    }

    setActiveBuses(controller.listActiveBuses());
    void refreshUpcomingStops(selectedBusId);
  };

  const displayedBuses = activeBuses.length ? activeBuses : fallbackSnapshots;
  const selectedSnapshot = displayedBuses.find((snapshot) => snapshot.busId === selectedBusId);
  const selectedRouteStops = selectedSnapshot
    ? stopProvider.getStopsForRoute(selectedSnapshot.routeId)
    : [];
  const currentStopIndex = selectedSnapshot?.nextStopIndex ?? 0;

  const busMarkers = displayedBuses.map((snapshot) => {
    const meta = busMetaById.get(snapshot.busId);
    return {
      id: snapshot.busId,
      position: snapshot.lastPosition,
      title: meta?.name ?? `Xe ${snapshot.busId}`,
      description: `${meta?.route ?? 'Tuyến'} - ${meta?.currentStop ?? 'Đang di chuyển'}`,
    };
  });

  const stopMarkers = selectedRouteStops.map((stop, index) => {
    const meta = stopMetaById.get(stop.stopId);
    const phase =
      index < currentStopIndex ? 'completed' : index === currentStopIndex ? 'current' : 'upcoming';
    const color = phase === 'completed' ? '#22c55e' : phase === 'current' ? '#2563eb' : '#94a3b8';

    return {
      id: `${selectedSnapshot?.busId ?? 'route'}-${stop.stopId}`,
      position: stop.position,
      title: meta?.name ?? `Điểm dừng ${index + 1}`,
      description: meta ? `${meta.displayTime} • ${meta.students} học sinh` : undefined,
      iconColor: color,
      iconScale: phase === 'current' ? 8 : 6,
      label: String(index + 1),
      zIndex: phase === 'current' ? 60 : 40 - index,
    };
  });

  const routePolylines =
    selectedRouteStops.length >= 2
      ? [
          {
            id: `${selectedSnapshot?.busId ?? 'route'}-polyline`,
            path: selectedRouteStops.map((stop) => stop.position),
            options: {
              strokeColor: '#2563eb',
              strokeOpacity: 0.75,
              strokeWeight: 4,
            },
          },
        ]
      : [];

  const mapCenter = busMarkers[0]?.position ?? DEFAULT_CENTER;
  const selectedBusMeta = selectedBusId ? busMetaById.get(selectedBusId) : undefined;

  return (
    <div className="space-y-6">
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
          <Button variant="outline" onClick={handleReload}>
            Tải lại
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                markers={[...busMarkers, ...stopMarkers]}
                polylines={routePolylines}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Xe đang hoạt động</CardTitle>
              <CardDescription>{displayedBuses.length} xe đang trong tuyến</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {displayedBuses.map((snapshot) => {
                const meta = busMetaById.get(snapshot.busId);

                return (
                  <div
                    key={snapshot.busId}
                    className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{meta?.name ?? `Xe ${snapshot.busId}`}</p>
                        <p className="text-gray-600">{meta?.driver ?? snapshot.driverId}</p>
                      </div>
                      <Badge className="bg-green-500">Hoạt động</Badge>
                    </div>
                    <div className="space-y-1.5 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{meta?.currentStop ?? 'Đang di chuyển'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Thời gian ước tính: {meta?.eta ?? '—'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{meta?.students ?? 0} học sinh</span>
                      </div>
                    </div>
                    <Button
                      variant={selectedBusId === snapshot.busId ? 'default' : 'outline'}
                      size="sm"
                      className={`w-full mt-3 ${
                        selectedBusId === snapshot.busId
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                      }`}
                      onClick={() => setSelectedBusId(snapshot.busId)}
                    >
                      {selectedBusId === snapshot.busId ? 'Đang theo dõi' : 'Theo dõi xe'}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>
            {selectedBusMeta ? `${selectedBusMeta.name} - Điểm dừng sắp tới` : 'Điểm dừng sắp tới'}
          </CardTitle>
          <CardDescription>
            {selectedBusMeta?.route ?? 'Chọn một xe đang hoạt động để xem các điểm dừng tiếp theo'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingStopCards.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingStopCards.map((stop, index) => (
                <div
                  key={stop.stopId}
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
                        <p className="text-gray-600">
                          {stop.displayTime} • ETA {stop.etaMinutes} phút
                        </p>
                      </div>
                    </div>
                    {stop.status === 'current' && <Badge className="bg-blue-600">Hiện tại</Badge>}
                    {stop.status === 'completed' && (
                      <Badge className="bg-green-600">Đã hoàn thành</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Cách khoảng {Math.round(stop.distanceMeters)} m</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Users className="w-4 h-4" />
                    <span>{stop.students} học sinh</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Nhấn &quot;Theo dõi xe&quot; trong danh sách bên phải để tải điểm dừng tiếp theo.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
