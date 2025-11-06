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
      title: 'Manager',
      description: 'Manage routes, buses, drivers, students.',
    },
    {
      id: 'driver' as const,
      icon: Car,
      title: 'Driver',
      description: 'View assigned routes, start/stop trips, report issues.',
    },
    {
      id: 'parent' as const,
      icon: Users,
      title: 'Parent',
      description: "Track child's bus and receive notifications.",
    },
    {
      id: 'student' as const,
      icon: GraduationCap,
      title: 'Student',
      description: 'Check schedule and stop information.',
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
          <DialogTitle className="text-indigo-900">Choose your role</DialogTitle>
          <DialogDescription className="text-gray-600">
            Select the role that best describes you to continue.
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
            Back to Home
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
