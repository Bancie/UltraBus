import { useState } from 'react';
import { Briefcase, Car, Users, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginFormProps {
  role: 'manager' | 'driver' | 'parent' | 'student';
  onBack: () => void;
  onLogin: () => void;
}

const roleConfig = {
  manager: {
    icon: Briefcase,
    title: 'Manager',
    helpText: "Sign in to manage your school's transportation system.",
  },
  driver: {
    icon: Car,
    title: 'Driver',
    helpText: 'Sign in to view your routes and manage trips.',
  },
  parent: {
    icon: Users,
    title: 'Parent',
    helpText: "Sign in to track your child's bus in real time.",
  },
  student: {
    icon: GraduationCap,
    title: 'Student',
    helpText: 'Sign in to check your bus schedule and stops.',
  },
};

export function LoginForm({ role, onBack, onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const config = roleConfig[role];
  const Icon = config.icon;
  const showTabs = role !== 'manager';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
              <Icon className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-indigo-900 mb-2">Sign in — {config.title}</h2>
            <p className="text-gray-600 text-sm">{config.helpText}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {showTabs ? (
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <div>
                    <Label htmlFor="email-login">Email</Label>
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-email">Password</Label>
                    <Input
                      id="password-email"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 rounded-lg"
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <div>
                    <Label htmlFor="phone-login">Phone Number</Label>
                    <Input
                      id="phone-login"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-phone">Password</Label>
                    <Input
                      id="password-phone"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 rounded-lg"
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="manager-email">Email</Label>
                  <Input
                    id="manager-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="manager-password">Password</Label>
                  <Input
                    id="manager-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 rounded-lg"
                    required
                  />
                </div>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="cursor-pointer">
                Remember me
              </Label>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-6 py-6"
              size="lg"
            >
              Sign in
            </Button>

            {/* Links */}
            <div className="mt-6 space-y-3 text-center text-sm">
              <a
                href="#forgot"
                className="block text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm"
              >
                Forgot password?
              </a>
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 rounded-lg"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back: choose a different role
              </Button>
            </div>

            {/* Terms Notice */}
            <p className="mt-6 text-xs text-gray-500 text-center">
              By continuing, you agree to the{' '}
              <a href="#terms" className="text-indigo-600 hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
