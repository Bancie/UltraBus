import { useState } from "react";
import { Search, MapPin, User, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: 1,
      name: "Emma Wilson",
      grade: "5th Grade",
      bus: "Bus #12",
      route: "Route A",
      pickup: "123 Oak Street",
      dropoff: "Lincoln Elementary",
      parent: "Jane Wilson",
      phone: "+1 (555) 111-2222",
      present: true,
    },
    {
      id: 2,
      name: "Liam Martinez",
      grade: "7th Grade",
      bus: "Bus #07",
      route: "Route B",
      pickup: "456 Maple Ave",
      dropoff: "Roosevelt Middle School",
      parent: "Carlos Martinez",
      phone: "+1 (555) 222-3333",
      present: true,
    },
    {
      id: 3,
      name: "Olivia Johnson",
      grade: "4th Grade",
      bus: "Bus #12",
      route: "Route A",
      pickup: "789 Pine Road",
      dropoff: "Lincoln Elementary",
      parent: "Sarah Johnson",
      phone: "+1 (555) 333-4444",
      present: false,
    },
    {
      id: 4,
      name: "Noah Brown",
      grade: "6th Grade",
      bus: "Bus #24",
      route: "Route D",
      pickup: "321 Elm Street",
      dropoff: "Kennedy Middle School",
      parent: "Michael Brown",
      phone: "+1 (555) 444-5555",
      present: true,
    },
    {
      id: 5,
      name: "Ava Garcia",
      grade: "8th Grade",
      bus: "Bus #07",
      route: "Route B",
      pickup: "654 Cedar Lane",
      dropoff: "Roosevelt Middle School",
      parent: "Maria Garcia",
      phone: "+1 (555) 555-6666",
      present: true,
    },
    {
      id: 6,
      name: "Ethan Davis",
      grade: "3rd Grade",
      bus: "Bus #19",
      route: "Route C",
      pickup: "987 Birch Ave",
      dropoff: "Washington Elementary",
      parent: "Emily Davis",
      phone: "+1 (555) 666-7777",
      present: true,
    },
    {
      id: 7,
      name: "Sophia Anderson",
      grade: "5th Grade",
      bus: "Bus #05",
      route: "Route A",
      pickup: "147 Spruce St",
      dropoff: "Lincoln Elementary",
      parent: "Lisa Anderson",
      phone: "+1 (555) 777-8888",
      present: false,
    },
    {
      id: 8,
      name: "Mason Lee",
      grade: "7th Grade",
      bus: "Bus #24",
      route: "Route D",
      pickup: "258 Willow Dr",
      dropoff: "Kennedy Middle School",
      parent: "James Lee",
      phone: "+1 (555) 888-9999",
      present: true,
    },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Student Management</h1>
          <p className="text-gray-600">
            View and manage all registered students
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export List</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Add Student</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Total Students</p>
            <p className="text-gray-900">1,350</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">On Board Today</p>
            <p className="text-gray-900">1,247</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Absent</p>
            <p className="text-gray-900">103</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Attendance Rate</p>
            <p className="text-gray-900">92.4%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>Search and manage student records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search students by name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Bus & Route</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Parent Contact</TableHead>
                  <TableHead>Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      <div>
                        <div>{student.bus}</div>
                        <div className="text-gray-500">{student.route}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {student.pickup}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{student.parent}</div>
                        <div className="text-gray-500">{student.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch checked={student.present} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-gray-900">{student.name}</p>
                      <p className="text-gray-600">{student.grade}</p>
                    </div>
                  </div>
                  <Badge
                    variant={student.present ? "default" : "secondary"}
                    className={student.present ? "bg-green-500" : ""}
                  >
                    {student.present ? "Present" : "Absent"}
                  </Badge>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {student.bus} - {student.route}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{student.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>
                      {student.parent} - {student.phone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
