import { Bus, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import clsx from 'clsx';

type NavBarProps = { onLoginClick: () => void };

export function NavBar({ onLoginClick }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

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
              Tính năng
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            >
              Chi phí
            </a>
            <a
              href="#support"
              className="text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
            >
              Hỗ trợ
            </a>
          </nav>

          <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={toggle}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={toggle} />
              <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg p-6 space-y-6 md:hidden">
                <nav className="flex flex-col gap-4">
                  <a href="#features" onClick={toggle}>
                    Tính năng
                  </a>
                  <a href="#pricing" onClick={toggle}>
                    Chi phí
                  </a>
                  <a href="#support" onClick={toggle}>
                    Hỗ trợ
                  </a>
                </nav>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => {
                    toggle();
                    onLoginClick();
                  }}
                >
                  Đăng nhập
                </Button>
              </div>
            </>
          )}

          {/* Login Button */}
          <Button
            onClick={onLoginClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  );
}
