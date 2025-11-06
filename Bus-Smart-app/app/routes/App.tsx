import type { Route } from './+types/App';
import { useState } from 'react';
import Layout from '~/components/app/Layout';
import Dashboard from '~/components/app/pages/Dashboard';
import Manager from '~/components/app/pages/Manager';
import Drivers from '~/components/app/pages/Drivers';
import Students from '~/components/app/pages/Students';
import RouteMap from '~/components/app/pages/RouteMap';
import ParentPortal from '~/components/app/pages/ParentPortal';
import indexStylesHref from '~/index.css?url';
import globalStylesHref from '~/styles/globals.css?url';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: indexStylesHref },
  { rel: 'stylesheet', href: globalStylesHref },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'manager':
        return <Manager />;
      case 'drivers':
        return <Drivers />;
      case 'students':
        return <Students />;
      case 'routes':
        return <RouteMap />;
      case 'parents':
        return <ParentPortal />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-gray-900">Settings</h1>
            <p className="text-gray-600">System settings and preferences coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}
