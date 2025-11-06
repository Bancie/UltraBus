import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onLoginClick: () => void;
}

export function Hero({ onLoginClick }: HeroProps) {
  return (
    <section className="w-full bg-gradient-to-b from-indigo-50 to-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-indigo-900 mb-4 sm:mb-6">
              Hệ thống quản lý đưa đón học sinh thông minh
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Quản lý tuyến đường, theo dõi xe và giám sát thời gian thực
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onLoginClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md px-8 py-6"
                size="lg"
              >
                Đăng nhập
              </Button>
              <Button
                variant="outline"
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg px-8 py-6"
                size="lg"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Right illustration */}
          <div className="relative">
            <div className="aspect-square w-full max-w-md mx-auto bg-gradient-to-br from-yellow-100 to-indigo-100 rounded-3xl shadow-lg overflow-hidden flex items-center justify-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=800&fit=crop"
                alt="School bus illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
