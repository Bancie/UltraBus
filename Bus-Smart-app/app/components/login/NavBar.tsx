import { Bus } from 'lucide-react';
import { Button } from './ui/button';

type NavBarProps = { onLoginClick: () => void };

export function NavBar({ onLoginClick }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <Bus className="h-6 w-6 text-white" />
            </div>
            <span className="text-indigo-900">Bus Smart</span>
          </div>

          {/* Nav Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            >
              Pricing
            </a>
            <a
              href="#support"
              className="text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            >
              Support
            </a>
          </nav>

          {/* Login Button */}
          <Button
            onClick={onLoginClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
          >
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
}
