import { useState } from 'react';
import { Search, MapPin, User, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { students } from '~/models/ModelStudents';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý học sinh</h1>
          <p className="text-gray-600">Xem và quản lý tất cả học sinh</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Xuất danh sách</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Thêm học sinh</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Tổng học sinh</p>
            <p className="text-gray-900">1,350</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Hiện diện hôm nay</p>
            <p className="text-gray-900">1,247</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Vắng</p>
            <p className="text-gray-900">103</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Tỉ lệ hiện diện</p>
            <p className="text-gray-900">92.4%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Danh bạ học sinh</CardTitle>
          <CardDescription>Tìm kiếm và chỉnh sửa danh bạ học sinh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm bằng tên..."
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
                  <TableHead>Học sinh</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Xe & tuyến đường</TableHead>
                  <TableHead>Điểm đón</TableHead>
                  <TableHead>Phụ huynh liên hệ</TableHead>
                  <TableHead>Hiện diện</TableHead>
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
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
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
              <div key={student.id} className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {student.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-gray-900">{student.name}</p>
                      <p className="text-gray-600">{student.grade}</p>
                    </div>
                  </div>
                  <Badge
                    variant={student.present ? 'default' : 'secondary'}
                    className={student.present ? 'bg-green-500' : ''}
                  >
                    {student.present ? 'Present' : 'Absent'}
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
