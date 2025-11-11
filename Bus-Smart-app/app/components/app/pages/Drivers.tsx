import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import drivers from '~/models/ModelDrivers';

export default function Drivers() {
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
