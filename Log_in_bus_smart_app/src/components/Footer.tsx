export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-600">
          <a
            href="#terms"
            className="hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
          >
            Terms
          </a>
          <a
            href="#privacy"
            className="hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
          >
            Privacy
          </a>
          <a
            href="#contact"
            className="hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm px-2 py-1"
          >
            Contact
          </a>
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 Bus Smart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}