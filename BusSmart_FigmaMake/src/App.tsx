import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import Manager from "./components/pages/Manager";
import Drivers from "./components/pages/Drivers";
import Students from "./components/pages/Students";
import RouteMap from "./components/pages/RouteMap";
import ParentPortal from "./components/pages/ParentPortal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "manager":
        return <Manager />;
      case "drivers":
        return <Drivers />;
      case "students":
        return <Students />;
      case "routes":
        return <RouteMap />;
      case "parents":
        return <ParentPortal />;
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-gray-900">Settings</h1>
            <p className="text-gray-600">
              System settings and preferences coming soon...
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
}