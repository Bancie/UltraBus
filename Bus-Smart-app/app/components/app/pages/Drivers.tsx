import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

export default function Drivers() {
  const drivers = [
    {
      id: 1,
      name: 'Nguyen Van An',
      license: 'DL-28475',
      phone: '+ 84 919 832 446',
      email: 'nguyen.van.an@busmart.com',
      bus: 'Xe số 12',
      route: 'Tuyến A - Quận 1',
      status: 'đang thực hiện',
      experience: '8 năm',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Tran Thi Bich',
      license: 'DL-39284',
      phone: '+ 84 919 832 447',
      email: 'tran.thi.bich@busmart.com',
      bus: 'Xe số 07',
      route: 'Tuyến B - Quận 10',
      status: 'đang thực hiện',
      experience: '5 năm',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Le Minh Khang',
      license: 'DL-47392',
      phone: '+ 84 919 832 423',
      email: 'le.minh.khang@busmart.com',
      bus: 'Xe số 19',
      route: 'Tuyến C - Quận 3',
      status: 'chưa phân công',
      experience: '12 năm',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Pham Thu Ha',
      license: 'DL-56283',
      phone: '+ 84 919 782 142',
      email: 'pham.thu.ha@busmart.com',
      bus: 'Xe số 24',
      route: 'Tuyến D - Quận 7',
      status: 'đang thực hiện',
      experience: '6 năm',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Do Quang Huy',
      license: 'DL-61847',
      phone: '+ 84 124 234 333',
      email: 'do.quang.huy@busmart.com',
      bus: 'Xe số 05',
      route: 'Tuyến A - Quận 1',
      status: 'đang thực hiện',
      experience: '10 năm',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'Hoang Lan Anh',
      license: 'DL-72938',
      phone: '+ 84 453 009 113',
      email: 'hoang.lan.anh@busmart.com',
      bus: 'Xe số 15',
      route: 'Tuyến B - Quận 10',
      status: 'chưa phân công',
      experience: '4 năm',
      rating: 4.6,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý tài xế</h1>
          <p className="text-gray-600">Xem và quản lý tất cả tài xế</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Xuất danh sách</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Thêm tài xế</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Tổng tài xế</p>
            <p className="text-gray-900">28</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Đang thực hiện</p>
            <p className="text-gray-900">22</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Chưa phân công</p>
            <p className="text-gray-900">6</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Đánh giá trung bình</p>
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
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-gray-900">{driver.name}</CardTitle>
                    <CardDescription>{driver.license}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={driver.status === 'đang thực hiện' ? 'default' : 'secondary'}
                  className={driver.status === 'đang thực hiện' ? 'bg-green-500' : 'bg-gray-500'}
                >
                  {driver.status === 'đang thực hiện' ? 'Đang thực hiện' : 'Chưa phân công'}
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
                <span>{driver.experience} kinh nghiệm</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Đánh giá: {driver.rating} ⭐</span>
              </div>
              <div className="pt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Gọi
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
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
