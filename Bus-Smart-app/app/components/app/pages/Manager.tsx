import { useEffect, useRef, useState } from 'react';
import { Plus, UserPlus, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import attendance from '~/models/ModelAttendance';
import RoutesController, { type RouteRecord } from '~/controllers/Routes';
import AssignController, { type AssignRecord } from '~/controllers/AssignController';
import type { BusRecord } from '~/controllers/Buses';
import type { DriverRecord } from '~/controllers/Drivers';

export default function Manager() {
  const [selectedTab, setSelectedTab] = useState('phancong');
  const routesControllerRef = useRef(new RoutesController());
  const assignControllerRef = useRef(new AssignController());
  const [routeList, setRouteList] = useState<RouteRecord[]>(() =>
    routesControllerRef.current.getRoutes(),
  );
  const [assignments, setAssignments] = useState<AssignRecord[]>(() =>
    assignControllerRef.current.getAssign(),
  );
  const [busList] = useState<BusRecord[]>(() => assignControllerRef.current.getBus());
  const [driverList] = useState<DriverRecord[]>(() => assignControllerRef.current.getDrivers());
  const [routeName, setRouteName] = useState('');
  const [routeStops, setRouteStops] = useState('');
  const [routeDistance, setRouteDistance] = useState('');
  const [routeAvgTime, setRouteAvgTime] = useState('');
  const [routeBuses, setRouteBuses] = useState('');
  const [routeError, setRouteError] = useState<string | null>(null);
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);
  const [assignForm, setAssignForm] = useState({
    busId: '',
    driverId: '',
    routeId: '',
    students: '',
    status: 'hoạt động',
  });

  useEffect(() => {
    if (!isRouteDialogOpen) {
      setRouteError(null);
    }
  }, [isRouteDialogOpen]);

  const resetRouteForm = () => {
    setRouteName('');
    setRouteStops('');
    setRouteDistance('');
    setRouteAvgTime('');
    setRouteBuses('');
  };

  const updateAssignForm = (field: keyof typeof assignForm, value: string) => {
    setAssignForm((prev) => ({ ...prev, [field]: value }));
    setAssignError(null);
  };

  const resetAssignForm = () => {
    setAssignForm({
      busId: '',
      driverId: '',
      routeId: '',
      students: '',
      status: 'hoạt động',
    });
  };

  const handleCreateAssign = () => {
    const bus = busList.find((item) => item.id.toString() === assignForm.busId);
    const driver = driverList.find((item) => item.id.toString() === assignForm.driverId);
    const route = routeList.find((item) => item.id.toString() === assignForm.routeId);

    if (!bus || !driver || !route) {
      setAssignError('Vui lòng chọn đầy đủ xe, tài xế và tuyến đường.');
      return;
    }

    const newAssign: AssignRecord = {
      id: Date.now(),
      bus: bus.name,
      driver: driver.name,
      route: route.name,
      students: Number(assignForm.students) || 0,
      status: assignForm.status,
      schedule: new Date(),
    };

    try {
      assignControllerRef.current.addAssign(newAssign);
      setAssignments(assignControllerRef.current.getAssign());
      setAssignError(null);
      resetAssignForm();
    } catch (error) {
      setAssignError(error instanceof Error ? error.message : 'Không thể tạo phân công.');
    }
  };

  const handleCreateRoute = () => {
    if (!routeName.trim()) {
      setRouteError('Vui lòng nhập tên tuyến đường.');
      return;
    }

    const normalizedDistance = (() => {
      const trimmed = routeDistance.trim();
      if (!trimmed) return '0 km';
      return trimmed.endsWith('km') ? trimmed : `${trimmed} km`;
    })();

    const normalizedAvgTime = (() => {
      const trimmed = routeAvgTime.trim();
      if (!trimmed) return '0 min';
      return trimmed.includes('min') ? trimmed : `${trimmed} min`;
    })();

    try {
      const newRoute: RouteRecord = {
        id: Date.now(),
        name: routeName.trim(),
        stops: Number(routeStops) || 0,
        distance: normalizedDistance,
        avgTime: normalizedAvgTime,
        buses: Number(routeBuses) || 0,
      };

      routesControllerRef.current.addRoute(newRoute);
      setRouteList(routesControllerRef.current.getRoutes());
      resetRouteForm();
      setRouteError(null);
      setIsRouteDialogOpen(false);
    } catch (error) {
      setRouteError(error instanceof Error ? error.message : 'Không thể tạo tuyến đường.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý và điều khiển</h1>
          <p className="text-gray-600">Quản lý phân công, tuyến đường và theo dõi học sinh.</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Tạo phân công mới
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo phân công mới</DialogTitle>
                <DialogDescription>
                  Phân công tài xế và học sinh với xe và tuyến đường tương ứng
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bus">Chọn xe</Label>
                  <Select
                    value={assignForm.busId}
                    onValueChange={(value) => updateAssignForm('busId', value)}
                  >
                    <SelectTrigger id="bus">
                      <SelectValue placeholder="Chọn một xe" />
                    </SelectTrigger>
                    <SelectContent>
                      {busList.map((bus) => (
                        <SelectItem key={bus.id} value={bus.id.toString()}>
                          {bus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Chọn tài xế</Label>
                  <Select
                    value={assignForm.driverId}
                    onValueChange={(value) => updateAssignForm('driverId', value)}
                  >
                    <SelectTrigger id="driver">
                      <SelectValue placeholder="Chọn một tài xế" />
                    </SelectTrigger>
                    <SelectContent>
                      {driverList.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Chọn tuyến đường</Label>
                  <Select
                    value={assignForm.routeId}
                    onValueChange={(value) => updateAssignForm('routeId', value)}
                  >
                    <SelectTrigger id="route">
                      <SelectValue placeholder="Chọn một tuyến đường" />
                    </SelectTrigger>
                    <SelectContent>
                      {routeList.map((route) => (
                        <SelectItem key={route.id} value={route.id.toString()}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="students">Số học sinh</Label>
                  <Input
                    id="students"
                    type="number"
                    min={0}
                    placeholder="Nhập số học sinh"
                    value={assignForm.students}
                    onChange={(event) => updateAssignForm('students', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={assignForm.status}
                    onValueChange={(value) => updateAssignForm('status', value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoạt động">Hoạt động</SelectItem>
                      <SelectItem value="bảo trì">Bảo trì</SelectItem>
                      <SelectItem value="tạm dừng">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {assignError && <p className="text-sm text-red-600">{assignError}</p>}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateAssign}
                >
                  Tạo phân công
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="phancong">Phân công công việc</TabsTrigger>
          <TabsTrigger value="routes">Tuyến đường</TabsTrigger>
          <TabsTrigger value="attendance">Giám sát</TabsTrigger>
        </TabsList>

        {/* phancong Tab */}
        <TabsContent value="phancong" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Phân công xe buýt và tài xế</CardTitle>
              <CardDescription>Quản lý tài xế, xe buýt và tuyến đường</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Xe buýt</TableHead>
                    <TableHead>Tài xế</TableHead>
                    <TableHead>Tuyến đường</TableHead>
                    <TableHead>Học sinh</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Chỉnh sửa</TableHead>
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
                          variant={assignment.status === 'hoạt động' ? 'default' : 'secondary'}
                          className={
                            assignment.status === 'hoạt động' ? 'bg-green-500' : 'bg-orange-500'
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
                  <CardTitle>Quản lý tuyến đường</CardTitle>
                  <CardDescription>Tạo và quản lý tuyến đường</CardDescription>
                </div>
                <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Tạo tuyến đường
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tạo tuyến mới</DialogTitle>
                      <DialogDescription>
                        Tạo tuyến xe mới với điểm dừng tương ứng
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="routeName">Tên tuyến đường</Label>
                        <Input
                          id="routeName"
                          placeholder="Ví dụ, Tuyến E - Quận 4"
                          value={routeName}
                          onChange={(event) => setRouteName(event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stops">Số lượng điểm dừng</Label>
                        <Input
                          id="stops"
                          type="number"
                          placeholder="12"
                          value={routeStops}
                          onChange={(event) => setRouteStops(event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="distance">Khoảng cách (km)</Label>
                        <Input
                          id="distance"
                          placeholder="18.5"
                          value={routeDistance}
                          onChange={(event) => setRouteDistance(event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="avgTime">Thời gian trung bình (phút)</Label>
                        <Input
                          id="avgTime"
                          placeholder="45"
                          value={routeAvgTime}
                          onChange={(event) => setRouteAvgTime(event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buses">Số xe phân công</Label>
                        <Input
                          id="buses"
                          type="number"
                          placeholder="6"
                          value={routeBuses}
                          onChange={(event) => setRouteBuses(event.target.value)}
                        />
                      </div>
                      {routeError && <p className="text-sm text-red-600">{routeError}</p>}
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={handleCreateRoute}
                      >
                        Tạo tuyến đường
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routeList.map((route) => (
                  <div key={route.id} className="p-4 rounded-lg border border-gray-200 bg-white">
                    <h3 className="text-gray-900 mb-3">{route.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Số điểm dừng:</span>
                        <span className="text-gray-900">{route.stops}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Khoảng cách:</span>
                        <span className="text-gray-900">{route.distance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Thời gian trung bình:</span>
                        <span className="text-gray-900">{route.avgTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Số xe phân công :</span>
                        <span className="text-gray-900">{route.buses}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Xem chi tiết
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
              <CardTitle>Giám sát và theo dõi</CardTitle>
              <CardDescription>Giám sát và theo dõi học sinh</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Hiện diện</TableHead>
                    <TableHead>Vắng</TableHead>
                    <TableHead>Sỉ số</TableHead>
                    <TableHead>Tỉ số hiện diện</TableHead>
                    <TableHead>Trạng thái</TableHead>
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
                          className={record.rate >= 93 ? 'bg-green-500' : 'bg-orange-500'}
                        >
                          {record.rate >= 93 ? 'Tốt' : 'Trung bình'}
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
