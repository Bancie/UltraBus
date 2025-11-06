import { MapPin, Clock, Phone, AlertCircle, User, Navigation, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function ParentPortal() {
  const childInfo = {
    name: 'Emma Wilson',
    grade: '5th Grade',
    studentId: 'ST-2847',
    school: 'Lincoln Elementary School',
    bus: 'Bus #12',
    route: 'Route A - North District',
  };

  const busInfo = {
    driver: 'John Smith',
    phone: '+1 (555) 123-4567',
    license: 'DL-28475',
    currentLocation: 'Cedar Lane & Oak Street',
    nextStop: 'Your Pickup Location',
    eta: '8 minutes',
    status: 'on-time',
    speed: '35 km/h',
  };

  const schedule = {
    morning: {
      pickup: '7:18 AM',
      arrival: '7:45 AM',
      location: '123 Oak Street',
    },
    afternoon: {
      departure: '2:30 PM',
      dropoff: '2:58 PM',
      location: '123 Oak Street',
    },
  };

  const recentTrips = [
    {
      id: 1,
      date: '2025-11-02',
      type: 'Morning',
      status: 'on-time',
      pickup: '7:18 AM',
      arrival: '7:43 AM',
    },
    {
      id: 2,
      date: '2025-11-01',
      type: 'Afternoon',
      status: 'on-time',
      departure: '2:30 PM',
      dropoff: '2:56 PM',
    },
    {
      id: 3,
      date: '2025-11-01',
      type: 'Morning',
      status: 'delayed',
      pickup: '7:18 AM',
      arrival: '7:52 AM',
    },
    {
      id: 4,
      date: '2025-10-31',
      type: 'Afternoon',
      status: 'on-time',
      departure: '2:30 PM',
      dropoff: '2:58 PM',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Parent Portal</h1>
        <p className="text-gray-600">Track your child's bus location and schedule</p>
      </div>

      {/* Active Alert */}
      <Alert className="border-blue-500 bg-blue-50">
        <Navigation className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Bus is on the way!</AlertTitle>
        <AlertDescription className="text-blue-700">
          Bus #{busInfo.driver.split(' ')[0]} is approaching your pickup location. Estimated arrival
          in {busInfo.eta}.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child & Bus Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Child Information */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Your child's details and assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-600 text-white text-xl">
                    {childInfo.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="text-gray-900">{childInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Grade</p>
                    <p className="text-gray-900">{childInfo.grade}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Student ID</p>
                    <p className="text-gray-900">{childInfo.studentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">School</p>
                    <p className="text-gray-900">{childInfo.school}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Assigned Bus</p>
                    <p className="text-gray-900">{childInfo.bus}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Route</p>
                    <p className="text-gray-900">{childInfo.route}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Tracking */}
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Bus Tracking</CardTitle>
                  <CardDescription>Current location of your child's bus</CardDescription>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Map Placeholder */}
              <div className="relative w-full h-[300px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden mb-4">
                {/* Grid */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full h-px bg-gray-400"
                      style={{ top: `${i * 20}%` }}
                    />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-gray-400"
                      style={{ left: `${i * 20}%` }}
                    />
                  ))}
                </div>

                {/* Bus marker */}
                <div className="absolute top-1/3 left-1/3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded px-2 py-1 shadow-lg whitespace-nowrap">
                    <p className="text-gray-900">{childInfo.bus}</p>
                  </div>
                </div>

                {/* Home marker */}
                <div className="absolute top-2/3 left-2/3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded px-2 py-1 shadow-lg whitespace-nowrap">
                    <p className="text-gray-900">Your Location</p>
                  </div>
                </div>

                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 200 100 L 400 200"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-gray-600">Current Location</p>
                    <p className="text-gray-900">{busInfo.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-600">Estimated Arrival</p>
                    <p className="text-gray-900">{busInfo.eta}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trips */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Recent Trip History</CardTitle>
              <CardDescription>Past 4 trips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      {trip.status === 'on-time' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                      <div>
                        <p className="text-gray-900">
                          {trip.date} - {trip.type}
                        </p>
                        <p className="text-gray-600">
                          {trip.type === 'Morning'
                            ? `Pickup: ${trip.pickup} → Arrival: ${trip.arrival}`
                            : `Departure: ${trip.departure} → Dropoff: ${trip.dropoff}`}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={trip.status === 'on-time' ? 'default' : 'secondary'}
                      className={trip.status === 'on-time' ? 'bg-green-500' : 'bg-orange-500'}
                    >
                      {trip.status === 'on-time' ? 'On Time' : 'Delayed'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Driver Contact */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
              <CardDescription>Contact your bus driver</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {busInfo.driver
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900">{busInfo.driver}</p>
                  <p className="text-gray-600">{busInfo.license}</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </Button>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Pickup and dropoff times</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-900">Morning Route</span>
                </div>
                <div className="space-y-1 text-gray-700">
                  <div className="flex justify-between">
                    <span>Pickup:</span>
                    <span className="text-gray-900">{schedule.morning.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arrival:</span>
                    <span className="text-gray-900">{schedule.morning.arrival}</span>
                  </div>
                  <div className="flex items-start gap-1 pt-1">
                    <MapPin className="w-3 h-3 mt-0.5" />
                    <span className="flex-1">{schedule.morning.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-900">Afternoon Route</span>
                </div>
                <div className="space-y-1 text-gray-700">
                  <div className="flex justify-between">
                    <span>Departure:</span>
                    <span className="text-gray-900">{schedule.afternoon.departure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dropoff:</span>
                    <span className="text-gray-900">{schedule.afternoon.dropoff}</span>
                  </div>
                  <div className="flex items-start gap-1 pt-1">
                    <MapPin className="w-3 h-3 mt-0.5" />
                    <span className="flex-1">{schedule.afternoon.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="w-4 h-4 mr-2" />
                Report an Issue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Update Contact Info
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
