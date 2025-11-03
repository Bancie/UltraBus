import { MapPin, Navigation, Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RouteMap() {
  const buses = [
    {
      id: 1,
      name: "Bus #12",
      route: "Route A - North District",
      driver: "John Smith",
      status: "on-route",
      currentStop: "Oak Street (3 of 12)",
      eta: "8 mins",
      students: 45,
      speed: "35 km/h",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: 2,
      name: "Bus #07",
      route: "Route B - East District",
      driver: "Sarah Johnson",
      status: "on-route",
      currentStop: "Maple Avenue (5 of 15)",
      eta: "12 mins",
      students: 52,
      speed: "40 km/h",
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      id: 3,
      name: "Bus #24",
      route: "Route D - West District",
      driver: "Emily Davis",
      status: "on-route",
      currentStop: "Elm Street (7 of 14)",
      eta: "6 mins",
      students: 48,
      speed: "32 km/h",
      lat: 40.7614,
      lng: -73.9776,
    },
  ];

  const upcomingStops = [
    {
      id: 1,
      name: "Oak Street",
      time: "7:05 AM",
      students: 8,
      status: "completed",
    },
    {
      id: 2,
      name: "Pine Road",
      time: "7:12 AM",
      students: 6,
      status: "completed",
    },
    {
      id: 3,
      name: "Cedar Lane",
      time: "7:18 AM",
      students: 9,
      status: "current",
    },
    {
      id: 4,
      name: "Maple Avenue",
      time: "7:25 AM",
      students: 7,
      status: "upcoming",
    },
    {
      id: 5,
      name: "Birch Street",
      time: "7:32 AM",
      students: 5,
      status: "upcoming",
    },
    {
      id: 6,
      name: "Lincoln Elementary",
      time: "7:45 AM",
      students: 45,
      status: "upcoming",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">
            Route Map & Tracking
          </h1>
          <p className="text-gray-600">
            Real-time location tracking for all active buses
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Routes</SelectItem>
              <SelectItem value="a">Route A</SelectItem>
              <SelectItem value="b">Route B</SelectItem>
              <SelectItem value="c">Route C</SelectItem>
              <SelectItem value="d">Route D</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle>Live Map View</CardTitle>
            <CardDescription>
              Current bus positions and routes
            </CardDescription>
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
                          <p className="text-gray-900">
                            {bus.name}
                          </p>
                          <p className="text-gray-600">
                            {bus.currentStop}
                          </p>
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
                    <span className="text-gray-700">
                      Active Bus
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    <span className="text-gray-700">
                      At Stop
                    </span>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white"
                  >
                    +
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white"
                  >
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
              <CardTitle>Active Buses</CardTitle>
              <CardDescription>
                {buses.length} buses on route
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">
                        {bus.name}
                      </p>
                      <p className="text-gray-600">
                        {bus.driver}
                      </p>
                    </div>
                    <Badge className="bg-green-500">
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-1.5 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{bus.currentStop}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>ETA: {bus.eta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{bus.students} students</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                  >
                    Track Bus
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
          <CardTitle>Bus #12 - Upcoming Stops</CardTitle>
          <CardDescription>
            Route A - North District schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingStops.map((stop, index) => (
              <div
                key={stop.id}
                className={`p-4 rounded-lg border-2 ${
                  stop.status === "current"
                    ? "border-blue-500 bg-blue-50"
                    : stop.status === "completed"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stop.status === "current"
                          ? "bg-blue-600 text-white"
                          : stop.status === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-900">
                        {stop.name}
                      </p>
                      <p className="text-gray-600">
                        {stop.time}
                      </p>
                    </div>
                  </div>
                  {stop.status === "current" && (
                    <Badge className="bg-blue-600">
                      Current
                    </Badge>
                  )}
                  {stop.status === "completed" && (
                    <Badge className="bg-green-600">Done</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{stop.students} students</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}