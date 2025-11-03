import { Phone, Mail, MapPin, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Drivers() {
  const drivers = [
    {
      id: 1,
      name: "John Smith",
      license: "DL-28475",
      phone: "+1 (555) 123-4567",
      email: "john.smith@busmart.com",
      bus: "Bus #12",
      route: "Route A - North District",
      status: "on-duty",
      experience: "8 years",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      license: "DL-39284",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@busmart.com",
      bus: "Bus #07",
      route: "Route B - East District",
      status: "on-duty",
      experience: "5 years",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Mike Brown",
      license: "DL-47392",
      phone: "+1 (555) 345-6789",
      email: "mike.brown@busmart.com",
      bus: "Bus #19",
      route: "Route C - South District",
      status: "off-duty",
      experience: "12 years",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Emily Davis",
      license: "DL-56283",
      phone: "+1 (555) 456-7890",
      email: "emily.davis@busmart.com",
      bus: "Bus #24",
      route: "Route D - West District",
      status: "on-duty",
      experience: "6 years",
      rating: 4.9,
    },
    {
      id: 5,
      name: "David Wilson",
      license: "DL-61847",
      phone: "+1 (555) 567-8901",
      email: "david.wilson@busmart.com",
      bus: "Bus #05",
      route: "Route A - North District",
      status: "on-duty",
      experience: "10 years",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      license: "DL-72938",
      phone: "+1 (555) 678-9012",
      email: "lisa.anderson@busmart.com",
      bus: "Bus #15",
      route: "Route B - East District",
      status: "off-duty",
      experience: "4 years",
      rating: 4.6,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">
            Driver Management
          </h1>
          <p className="text-gray-600">
            View and manage all registered drivers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export List</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add Driver
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Total Drivers</p>
            <p className="text-gray-900">28</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">On Duty</p>
            <p className="text-gray-900">22</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Off Duty</p>
            <p className="text-gray-900">6</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Avg Rating</p>
            <p className="text-gray-900">4.8 ⭐</p>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {drivers.map((driver) => (
          <Card key={driver.id} className="border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-gray-900">
                      {driver.name}
                    </CardTitle>
                    <CardDescription>
                      {driver.license}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    driver.status === "on-duty"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    driver.status === "on-duty"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }
                >
                  {driver.status === "on-duty"
                    ? "On Duty"
                    : "Off Duty"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{driver.route}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>{driver.bus}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{driver.experience} experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Rating: {driver.rating} ⭐</span>
              </div>
              <div className="pt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}