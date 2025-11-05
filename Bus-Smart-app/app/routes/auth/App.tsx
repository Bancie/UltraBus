import { useState } from 'react';
import { MapPin, Smartphone, Settings } from 'lucide-react';
import { NavBar } from '~/components/login/NavBar';
import { Hero } from '~/components/login/Hero';
import { FeatureCard } from '~/components/login/FeatureCard';
import { RolePickerModal } from '~/components/login/RolePickerModal';
import { LoginForm } from '~/components/login/LoginForm';
import { Footer } from '~/components/login/Footer';
import { useNavigate } from 'react-router';

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
    // For manager role, navigate to /manager (not designed yet)
    if (selectedRole === 'manager') {
      navigate('/home');
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
              <h2 className="text-indigo-900 mb-4">Everything you need</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bus Smart brings together drivers, parents, and administrators on one simple
                platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                icon={MapPin}
                title="Live Tracking"
                description="Parents see real-time bus location."
              />
              <FeatureCard
                icon={Smartphone}
                title="Driver App"
                description="Drivers view routes and report issues."
              />
              <FeatureCard
                icon={Settings}
                title="Admin Control"
                description="Managers manage students, drivers, and routes."
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
