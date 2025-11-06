import {
  Bus,
  Users,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Buses",
      value: "24",
      subtitle: "of 28 total",
      icon: Bus,
      color: "bg-blue-500",
      trend: "+2 from yesterday",
    },
    {
      title: "Drivers on Route",
      value: "22",
      subtitle: "currently driving",
      icon: UserCheck,
      color: "bg-green-500",
      trend: "91% attendance",
    },
    {
      title: "Students On Board",
      value: "1,247",
      subtitle: "of 1,350 total",
      icon: Users,
      color: "bg-purple-500",
      trend: "92% capacity",
    },
    {
      title: "Active Alerts",
      value: "3",
      subtitle: "needs attention",
      icon: AlertTriangle,
      color: "bg-orange-500",
      trend: "2 resolved today",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      bus: "Bus #12",
      message: "Running 5 minutes late",
      time: "2 mins ago",
      severity: "warning",
    },
    {
      id: 2,
      bus: "Bus #07",
      message: "Completed route successfully",
      time: "15 mins ago",
      severity: "success",
    },
    {
      id: 3,
      bus: "Bus #19",
      message: "Maintenance required soon",
      time: "1 hour ago",
      severity: "info",
    },
  ];

  const upcomingSchedules = [
    {
      id: 1,
      route: "Route A - Morning",
      time: "07:00 AM",
      buses: 6,
      status: "On Time",
    },
    {
      id: 2,
      route: "Route B - Morning",
      time: "07:30 AM",
      buses: 8,
      status: "On Time",
    },
    {
      id: 3,
      route: "Route C - Afternoon",
      time: "02:30 PM",
      buses: 5,
      status: "Scheduled",
    },
    {
      id: 4,
      route: "Route D - Afternoon",
      time: "03:00 PM",
      buses: 7,
      status: "Scheduled",
    },
  ];

  const busPerformance = [
    { route: "Route A", onTime: 95, label: "On-Time Rate" },
    { route: "Route B", onTime: 88, label: "On-Time Rate" },
    { route: "Route C", onTime: 92, label: "On-Time Rate" },
    { route: "Route D", onTime: 85, label: "On-Time Rate" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your fleet today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-gray-500">{stat.subtitle}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              Latest notifications and updates from your fleet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "warning"
                        ? "bg-orange-500"
                        : alert.severity === "success"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900">{alert.bus}</span>
                      <span className="text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-gray-600">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bus Performance */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Route Performance</CardTitle>
            <CardDescription>On-time delivery rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {busPerformance.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{item.route}</span>
                    <span className="text-gray-900">{item.onTime}%</span>
                  </div>
                  <Progress value={item.onTime} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Schedules */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Upcoming routes and departure times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="p-4 rounded-lg border border-gray-200 bg-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-900">{schedule.time}</span>
                </div>
                <p className="text-gray-700 mb-2">{schedule.route}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{schedule.buses} buses</span>
                  <Badge
                    variant={
                      schedule.status === "On Time" ? "default" : "secondary"
                    }
                    className={
                      schedule.status === "On Time" ? "bg-green-500" : ""
                    }
                  >
                    {schedule.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
