import { Briefcase, Car, Users, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { RoleCard } from './RoleCard';

type RolePickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelectRole: (role: 'manager' | 'driver' | 'parent' | 'student') => void;
};

export function RolePickerModal({ open, onClose, onSelectRole }: RolePickerModalProps) {
  const roles = [
    {
      id: 'manager' as const,
      icon: Briefcase,
      title: 'Quản lý',
      description: 'Quản lý tuyến đường, xe buýt, tài xế và học sinh.',
    },
    {
      id: 'driver' as const,
      icon: Car,
      title: 'Tài xế',
      description: 'Xem tuyến đường phân công và lịch trình.',
    },
    {
      id: 'parent' as const,
      icon: Users,
      title: 'Phụ huynh',
      description: 'Theo dõi con bạn theo thời gian thực.',
    },
    {
      id: 'student' as const,
      icon: GraduationCap,
      title: 'Học sinh',
      description: 'Xem lịch trình xe buýt và điểm dừng.',
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-indigo-900">Chọn vai trò của bạn</DialogTitle>
          <DialogDescription className="text-gray-600">
            Chọn vài trò phù hợp với mô tả vai trò bên dưới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              icon={role.icon}
              title={role.title}
              description={role.description}
              onSelect={() => onSelectRole(role.id)}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
          >
            Quay về trang chủ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
