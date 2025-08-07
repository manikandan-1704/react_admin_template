import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './index.css';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import AccessControl from './pages/AccessControl';
import Settings from './pages/Settings';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <Router>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-16"> 
        <Sidebar isCollapsed={isSidebarCollapsed} />

        <main
          className={`flex-grow p-6 transition-all duration-300 ${
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/access-control" element={<AccessControl />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      {/* <Footer /> */}
    </div>
    </Router>
  );
}

export default App;
