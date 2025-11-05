import { useState } from "react";
import {
  Plus,
  UserPlus,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Manager() {
  const [selectedTab, setSelectedTab] = useState("assignments");

  const assignments = [
    {
      id: 1,
      bus: "Bus #12",
      driver: "John Smith",
      route: "Route A",
      students: 45,
      status: "active",
    },
    {
      id: 2,
      bus: "Bus #07",
      driver: "Sarah Johnson",
      route: "Route B",
      students: 52,
      status: "active",
    },
    {
      id: 3,
      bus: "Bus #19",
      driver: "Mike Brown",
      route: "Route C",
      students: 38,
      status: "maintenance",
    },
    {
      id: 4,
      bus: "Bus #24",
      driver: "Emily Davis",
      route: "Route D",
      students: 48,
      status: "active",
    },
    {
      id: 5,
      bus: "Bus #05",
      driver: "David Wilson",
      route: "Route A",
      students: 41,
      status: "active",
    },
  ];

  const routes = [
    {
      id: 1,
      name: "Route A - North District",
      stops: 12,
      distance: "18.5 km",
      avgTime: "45 min",
      buses: 6,
    },
    {
      id: 2,
      name: "Route B - East District",
      stops: 15,
      distance: "22.3 km",
      avgTime: "52 min",
      buses: 8,
    },
    {
      id: 3,
      name: "Route C - South District",
      stops: 10,
      distance: "15.8 km",
      avgTime: "38 min",
      buses: 5,
    },
    {
      id: 4,
      name: "Route D - West District",
      stops: 14,
      distance: "20.1 km",
      avgTime: "48 min",
      buses: 7,
    },
  ];

  const attendance = [
    {
      id: 1,
      date: "2025-11-02",
      present: 1247,
      absent: 103,
      total: 1350,
      rate: 92.4,
    },
    {
      id: 2,
      date: "2025-11-01",
      present: 1265,
      absent: 85,
      total: 1350,
      rate: 93.7,
    },
    {
      id: 3,
      date: "2025-10-31",
      present: 1238,
      absent: 112,
      total: 1350,
      rate: 91.7,
    },
    {
      id: 4,
      date: "2025-10-30",
      present: 1280,
      absent: 70,
      total: 1350,
      rate: 94.8,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Manager Console</h1>
          <p className="text-gray-600">
            Manage assignments, routes, and monitor attendance
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Assign a driver and students to a bus and route
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bus">Select Bus</Label>
                  <Select>
                    <SelectTrigger id="bus">
                      <SelectValue placeholder="Choose a bus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">Bus #12</SelectItem>
                      <SelectItem value="07">Bus #07</SelectItem>
                      <SelectItem value="19">Bus #19</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Select Driver</Label>
                  <Select>
                    <SelectTrigger id="driver">
                      <SelectValue placeholder="Choose a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Select Route</Label>
                  <Select>
                    <SelectTrigger id="route">
                      <SelectValue placeholder="Choose a route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">
                        Route A - North District
                      </SelectItem>
                      <SelectItem value="b">Route B - East District</SelectItem>
                      <SelectItem value="c">
                        Route C - South District
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Bus & Driver Assignments</CardTitle>
              <CardDescription>
                Current assignments for buses, drivers, and routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.bus}</TableCell>
                      <TableCell>{assignment.driver}</TableCell>
                      <TableCell>{assignment.route}</TableCell>
                      <TableCell>{assignment.students}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            assignment.status === "active"
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Route Management</CardTitle>
                  <CardDescription>
                    Create and manage bus routes
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      New Route
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Route</DialogTitle>
                      <DialogDescription>
                        Define a new bus route with stops
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="routeName">Route Name</Label>
                        <Input
                          id="routeName"
                          placeholder="e.g., Route E - Central District"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stops">Number of Stops</Label>
                        <Input id="stops" type="number" placeholder="12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="distance">Distance (km)</Label>
                        <Input id="distance" placeholder="18.5" />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Create Route
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className="p-4 rounded-lg border border-gray-200 bg-white"
                  >
                    <h3 className="text-gray-900 mb-3">{route.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Stops:</span>
                        <span className="text-gray-900">{route.stops}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Distance:</span>
                        <span className="text-gray-900">{route.distance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Avg Time:</span>
                        <span className="text-gray-900">{route.avgTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Assigned Buses:</span>
                        <span className="text-gray-900">{route.buses}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Attendance Monitor</CardTitle>
              <CardDescription>
                Track daily student attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {record.present}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          {record.absent}
                        </div>
                      </TableCell>
                      <TableCell>{record.total}</TableCell>
                      <TableCell>{record.rate}%</TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className={
                            record.rate >= 93 ? "bg-green-500" : "bg-orange-500"
                          }
                        >
                          {record.rate >= 93 ? "Good" : "Fair"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
