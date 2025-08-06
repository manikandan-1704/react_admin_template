import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-16"> {/* Add pt-16 for header spacing */}
        <Sidebar isCollapsed={isSidebarCollapsed} />

        <main className="flex-grow p-6 transition-all duration-300">
          <p className="text-gray-600">Main content goes here.</p>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
