import type { Route } from './+types/homepage';
import { useState } from 'react';
import { MapPin, Smartphone, Settings } from 'lucide-react';
import { NavBar } from '~/components/login/NavBar';
import { Hero } from '~/components/login/Hero';
import { FeatureCard } from '~/components/login/FeatureCard';
import { RolePickerModal } from '~/components/login/RolePickerModal';
import { LoginForm } from '~/components/login/LoginForm';
import { Footer } from '~/components/login/Footer';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Bus Smart 1.0' },
    { name: 'description', content: 'Welcome to Bus Smart 1.0!' },
  ];
}

type Page = 'home' | 'login';
type Role = 'manager' | 'driver' | 'parent' | 'student' | null;

export default function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState<Page>('home');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [showRolePicker, setShowRolePicker] = useState(false);

  const handleLoginClick = () => {
    setShowRolePicker(true);
  };

  const handleRoleSelect = (role: 'manager' | 'driver' | 'parent' | 'student') => {
    setSelectedRole(role);
    setShowRolePicker(false);
    setPage('login');
  };

  const handleBackToRolePicker = () => {
    setSelectedRole(null);
    setPage('home');
    setShowRolePicker(true);
  };

  const handleLogin = () => {
    // Manager role redirects to the dashboard experience
    if (selectedRole === 'manager') {
      navigate('/manage');
    } else {
      // For other roles, would navigate to their respective dashboards
      alert(`Login successful for ${selectedRole}`);
    }
  };

  if (page === 'login' && selectedRole) {
    return <LoginForm role={selectedRole} onBack={handleBackToRolePicker} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <NavBar onLoginClick={handleLoginClick} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onLoginClick={handleLoginClick} />

        {/* Features Section */}
        <section id="features" className="w-full py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-indigo-900 mb-4">Hệ thống hỗ trợ cách tính năng</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Được xây dựng và phát triển bởi Chí Bằng, Phúc Khôi, Huy Vũ - Nhóm 06
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                icon={MapPin}
                title="Theo dõi trực tuyến"
                description="Giúp quản lý theo dõi và cập nhật thông tin tuyến trình"
              />
              <FeatureCard
                icon={Settings}
                title="Quản lý thông tin"
                description="Giúp quản lý thông tin tài xế, học sinh và lịch trình"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Role Picker Modal */}
      <RolePickerModal
        open={showRolePicker}
        onClose={() => setShowRolePicker(false)}
        onSelectRole={handleRoleSelect}
      />
    </div>
  );
}
