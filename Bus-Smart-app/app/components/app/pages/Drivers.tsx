import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DriverController, { type DriverRecord } from '~/controllers/Drivers';

type DriverFormState = {
  name: string;
  license: string;
  phone: string;
  email: string;
  bus: string;
  route: string;
  status: DriverRecord['status'];
  experience: string;
  rating: string;
};

const createInitialFormState = (): DriverFormState => ({
  name: '',
  license: '',
  phone: '',
  email: '',
  bus: '',
  route: '',
  status: 'đang thực hiện',
  experience: '',
  rating: '',
});

export default function Drivers() {
  const driverControllerRef = useRef(new DriverController());
  const [driverList, setDriverList] = useState<DriverRecord[]>(() =>
    driverControllerRef.current.getDrivers(),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState<DriverFormState>(createInitialFormState);
  const [formError, setFormError] = useState<string | null>(null);

  const totalDrivers = driverList.length;
  const activeDrivers = driverList.filter((driver) => driver.status === 'đang thực hiện').length;
  const unassignedDrivers = totalDrivers - activeDrivers;
  const averageRating =
    totalDrivers > 0
      ? (driverList.reduce((sum, driver) => sum + (driver.rating ?? 0), 0) / totalDrivers).toFixed(
          1,
        )
      : '0.0';

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleFormChange = (field: keyof DriverFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formError) {
      setFormError(null);
    }
  };

  const resetForm = () => {
    setForm(createInitialFormState());
    setFormError(null);
  };

  const handleAddDriver = () => {
    if (!form.name.trim() || !form.license.trim() || !form.phone.trim()) {
      setFormError('Vui lòng nhập đầy đủ tên, số bằng lái và số điện thoại.');
      return;
    }

    const parsedRating = Number(form.rating);
    if (form.rating && (Number.isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5)) {
      setFormError('Đánh giá phải là số từ 0 đến 5.');
      return;
    }

    const newDriver: DriverRecord = {
      id: Date.now(),
      name: form.name.trim(),
      license: form.license.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      bus: form.bus.trim() || 'Chưa cập nhật',
      route: form.route.trim() || 'Chưa cập nhật',
      status: form.status,
      experience: form.experience.trim() || 'Chưa cập nhật',
      rating: form.rating ? Number(parsedRating.toFixed(1)) : 0,
    };

    try {
      driverControllerRef.current.addDriver(newDriver);
      setDriverList(driverControllerRef.current.getDrivers());
      handleDialogChange(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Không thể thêm tài xế.');
    }
  };

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
          <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Thêm tài xế</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm tài xế</DialogTitle>
                <DialogDescription>
                  Nhập thông tin tài xế mới để quản lý trong hệ thống.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(event) => handleFormChange('name', event.target.value)}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Số bằng lái</Label>
                    <Input
                      id="license"
                      value={form.license}
                      onChange={(event) => handleFormChange('license', event.target.value)}
                      placeholder="VD: DL-12345"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => handleFormChange('phone', event.target.value)}
                      placeholder="+84 ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => handleFormChange('email', event.target.value)}
                      placeholder="email@busmart.com"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bus">Xe phụ trách</Label>
                    <Input
                      id="bus"
                      value={form.bus}
                      onChange={(event) => handleFormChange('bus', event.target.value)}
                      placeholder="VD: Xe số 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Tuyến đường</Label>
                    <Input
                      id="route"
                      value={form.route}
                      onChange={(event) => handleFormChange('route', event.target.value)}
                      placeholder="VD: Tuyến A - Quận 1"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={form.status}
                      onValueChange={(value) => handleFormChange('status', value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="đang thực hiện">Đang thực hiện</SelectItem>
                        <SelectItem value="chưa phân công">Chưa phân công</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm</Label>
                    <Input
                      id="experience"
                      value={form.experience}
                      onChange={(event) => handleFormChange('experience', event.target.value)}
                      placeholder="VD: 5 năm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Đánh giá (0 - 5)</Label>
                  <Input
                    id="rating"
                    value={form.rating}
                    onChange={(event) => handleFormChange('rating', event.target.value)}
                    placeholder="4.8"
                  />
                </div>
                {formError && <p className="text-sm text-red-600">{formError}</p>}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogChange(false)}>
                  Hủy
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddDriver}>
                  Lưu tài xế
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Tổng tài xế</p>
            <p className="text-gray-900">{totalDrivers}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Đang thực hiện</p>
            <p className="text-gray-900">{activeDrivers}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Chưa phân công</p>
            <p className="text-gray-900">{unassignedDrivers}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Đánh giá trung bình</p>
            <p className="text-gray-900">{averageRating} ⭐</p>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {driverList.map((driver) => (
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
                <span>{driver.route || 'Chưa cập nhật tuyến'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>{driver.bus || 'Chưa có xe'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{driver.experience} kinh nghiệm</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Đánh giá: {driver.rating.toFixed(1)} ⭐</span>
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
