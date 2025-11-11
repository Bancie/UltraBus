import { useState } from 'react';
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
import routes from '~/models/ModelRoutes';
import phancong from '~/models/ModelAsign';
import attendance from '~/models/ModelAttendance';

export default function Manager() {
  const [selectedTab, setSelectedTab] = useState('phancong');

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
                  <Select>
                    <SelectTrigger id="bus">
                      <SelectValue placeholder="Chọn một xe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">Bus số 12</SelectItem>
                      <SelectItem value="07">Bus số 07</SelectItem>
                      <SelectItem value="19">Bus số 19</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Chọn tài xế</Label>
                  <Select>
                    <SelectTrigger id="driver">
                      <SelectValue placeholder="Chọn một tài xế" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nguyen-van-an">Nguyễn Văn An</SelectItem>
                      <SelectItem value="tran-thi-bich">Trần Thị Bích</SelectItem>
                      <SelectItem value="le-minh-khang">Lê Minh Khang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Chọn tuyến đường</Label>
                  <Select>
                    <SelectTrigger id="route">
                      <SelectValue placeholder="Chọn một tuyến đường" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Tuyến A - Quận 1</SelectItem>
                      <SelectItem value="b">Tuyến B - Quận 10</SelectItem>
                      <SelectItem value="c">Tuyến C - Quận 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Tạo phân công</Button>
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
                  {phancong.map((assignment) => (
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
                <Dialog>
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
                        <Input id="routeName" placeholder="Ví dụ, Tuyến E - Quận 4" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stops">Số lượng điểm dừng</Label>
                        <Input id="stops" type="number" placeholder="12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="distance">Khoảng cách (km)</Label>
                        <Input id="distance" placeholder="18.5" />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Tạo tuyến đường
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routes.map((route) => (
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
