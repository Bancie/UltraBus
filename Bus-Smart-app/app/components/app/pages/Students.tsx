import { useRef, useState } from 'react';
import { Search, MapPin, User, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Switch } from '../ui/switch';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Label } from '../ui/label';
import StudentsController, { type StudentRecord } from '~/controllers/Students';

type StudentFormState = {
  name: string;
  grade: string;
  bus: string;
  route: string;
  pickup: string;
  dropoff: string;
  parent: string;
  phone: string;
  present: boolean;
};

const createInitialFormState = (): StudentFormState => ({
  name: '',
  grade: '',
  bus: '',
  route: '',
  pickup: '',
  dropoff: '',
  parent: '',
  phone: '',
  present: true,
});

export default function Students() {
  const studentsControllerRef = useRef(new StudentsController());
  const [studentList, setStudentList] = useState<StudentRecord[]>(() =>
    studentsControllerRef.current.getStudents(),
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [form, setForm] = useState<StudentFormState>(createInitialFormState);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredStudents = studentList.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalStudents = studentList.length;
  const presentStudents = studentList.filter((student) => student.present).length;
  const absentStudents = totalStudents - presentStudents;
  const attendanceRate =
    totalStudents > 0 ? ((presentStudents / totalStudents) * 100).toFixed(1) : '0.0';

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleEditDialogChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      resetForm();
      setEditingStudentId(null);
      setFormError(null);
    }
  };

  const handleFormChange = (field: keyof StudentFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formError) {
      setFormError(null);
    }
  };

  const resetForm = () => {
    setForm(createInitialFormState());
    setFormError(null);
  };

  const handleAddStudent = () => {
    if (!form.name.trim() || !form.grade.trim() || !form.parent.trim() || !form.phone.trim()) {
      setFormError('Vui lòng nhập đầy đủ tên, lớp, phụ huynh và số điện thoại.');
      return;
    }

    const newStudent: StudentRecord = {
      id: Date.now(),
      name: form.name.trim(),
      grade: form.grade.trim(),
      bus: form.bus.trim() || 'Chưa cập nhật',
      route: form.route.trim() || 'Chưa cập nhật',
      pickup: form.pickup.trim() || 'Chưa cập nhật',
      dropoff: form.dropoff.trim() || 'Chưa cập nhật',
      parent: form.parent.trim(),
      phone: form.phone.trim(),
      present: form.present,
    };

    try {
      studentsControllerRef.current.addStudent(newStudent);
      setStudentList(studentsControllerRef.current.getStudents());
      handleDialogChange(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Không thể thêm học sinh.');
    }
  };

  const handleEditClick = (student: StudentRecord) => {
    setForm({
      name: student.name,
      grade: student.grade,
      bus: student.bus,
      route: student.route,
      pickup: student.pickup,
      dropoff: student.dropoff,
      parent: student.parent,
      phone: student.phone,
      present: student.present,
    });
    setEditingStudentId(student.id);
    setIsEditDialogOpen(true);
  };

  const handleEditStudent = () => {
    if (editingStudentId === null) {
      return;
    }

    if (!form.name.trim() || !form.grade.trim() || !form.parent.trim() || !form.phone.trim()) {
      setFormError('Vui lòng nhập đầy đủ tên, lớp, phụ huynh và số điện thoại.');
      return;
    }

    const existingStudent = studentsControllerRef.current.getStudentById(editingStudentId);
    if (!existingStudent) {
      setFormError('Không tìm thấy học sinh cần chỉnh sửa.');
      return;
    }

    try {
      studentsControllerRef.current.editStudent(editingStudentId, {
        name: form.name.trim(),
        grade: form.grade.trim(),
        bus: form.bus.trim() || 'Chưa cập nhật',
        route: form.route.trim() || 'Chưa cập nhật',
        pickup: form.pickup.trim() || 'Chưa cập nhật',
        dropoff: form.dropoff.trim() || 'Chưa cập nhật',
        parent: form.parent.trim(),
        phone: form.phone.trim(),
        present: form.present,
      });
      setStudentList(studentsControllerRef.current.getStudents());
      handleEditDialogChange(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Không thể cập nhật học sinh.');
    }
  };

  const handleRemoveStudent = () => {
    if (editingStudentId === null) {
      return;
    }

    try {
      studentsControllerRef.current.removeStudent(editingStudentId);
      setStudentList(studentsControllerRef.current.getStudents());
      resetForm();
      setIsEditDialogOpen(false);
      setEditingStudentId(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Không thể xóa học sinh.');
    }
  };

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
          <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Thêm học sinh</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm học sinh</DialogTitle>
                <DialogDescription>
                  Nhập thông tin học sinh mới để quản lý trong hệ thống.
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
                    <Label htmlFor="grade">Lớp</Label>
                    <Input
                      id="grade"
                      value={form.grade}
                      onChange={(event) => handleFormChange('grade', event.target.value)}
                      placeholder="VD: Lớp 5"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bus">Xe</Label>
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
                      placeholder="VD: Tuyến A"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Điểm đón</Label>
                    <Input
                      id="pickup"
                      value={form.pickup}
                      onChange={(event) => handleFormChange('pickup', event.target.value)}
                      placeholder="VD: 123 Đường Lê Lợi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoff">Điểm trả</Label>
                    <Input
                      id="dropoff"
                      value={form.dropoff}
                      onChange={(event) => handleFormChange('dropoff', event.target.value)}
                      placeholder="VD: Trường Tiểu học..."
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parent">Tên phụ huynh</Label>
                    <Input
                      id="parent"
                      value={form.parent}
                      onChange={(event) => handleFormChange('parent', event.target.value)}
                      placeholder="VD: Trần Thị Hoa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => handleFormChange('phone', event.target.value)}
                      placeholder="+84 ..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.present}
                      onCheckedChange={(checked) => handleFormChange('present', checked)}
                    />
                    <Label htmlFor="present">Hiện diện</Label>
                  </div>
                </div>
                {formError && <p className="text-sm text-red-600">{formError}</p>}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogChange(false)}>
                  Hủy
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddStudent}>
                  Lưu học sinh
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Chỉnh sửa học sinh</DialogTitle>
                <DialogDescription>Cập nhật thông tin học sinh trong hệ thống.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Họ và tên</Label>
                    <Input
                      id="edit-name"
                      value={form.name}
                      onChange={(event) => handleFormChange('name', event.target.value)}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-grade">Lớp</Label>
                    <Input
                      id="edit-grade"
                      value={form.grade}
                      onChange={(event) => handleFormChange('grade', event.target.value)}
                      placeholder="VD: Lớp 5"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-bus">Xe</Label>
                    <Input
                      id="edit-bus"
                      value={form.bus}
                      onChange={(event) => handleFormChange('bus', event.target.value)}
                      placeholder="VD: Xe số 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-route">Tuyến đường</Label>
                    <Input
                      id="edit-route"
                      value={form.route}
                      onChange={(event) => handleFormChange('route', event.target.value)}
                      placeholder="VD: Tuyến A"
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-pickup">Điểm đón</Label>
                    <Input
                      id="edit-pickup"
                      value={form.pickup}
                      onChange={(event) => handleFormChange('pickup', event.target.value)}
                      placeholder="VD: 123 Đường Lê Lợi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-dropoff">Điểm trả</Label>
                    <Input
                      id="edit-dropoff"
                      value={form.dropoff}
                      onChange={(event) => handleFormChange('dropoff', event.target.value)}
                      placeholder="VD: Trường Tiểu học..."
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-parent">Tên phụ huynh</Label>
                    <Input
                      id="edit-parent"
                      value={form.parent}
                      onChange={(event) => handleFormChange('parent', event.target.value)}
                      placeholder="VD: Trần Thị Hoa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Số điện thoại</Label>
                    <Input
                      id="edit-phone"
                      value={form.phone}
                      onChange={(event) => handleFormChange('phone', event.target.value)}
                      placeholder="+84 ..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.present}
                      onCheckedChange={(checked) => handleFormChange('present', checked)}
                    />
                    <Label htmlFor="edit-present">Hiện diện</Label>
                  </div>
                </div>
                {formError && <p className="text-sm text-red-600">{formError}</p>}
              </div>
              <DialogFooter>
                <div className="flex gap-2 w-full">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1">
                        Xóa
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa học sinh</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc chắn muốn xóa học sinh này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleRemoveStudent}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" onClick={() => handleEditDialogChange(false)}>
                    Hủy
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleEditStudent}>
                    Cập nhật
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Tổng học sinh</p>
            <p className="text-gray-900">{totalStudents}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Hiện diện hôm nay</p>
            <p className="text-gray-900">{presentStudents}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Vắng</p>
            <p className="text-gray-900">{absentStudents}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-600 mb-1">Tỉ lệ hiện diện</p>
            <p className="text-gray-900">{attendanceRate}%</p>
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
                  <TableHead>Chỉnh sửa</TableHead>
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
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(student)}>
                        Chỉnh sửa
                      </Button>
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
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleEditClick(student)}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
