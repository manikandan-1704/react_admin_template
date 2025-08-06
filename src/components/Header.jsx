import React from 'react';
import { Menu, Bell, MessageSquare } from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gray-50 shadow z-50 flex items-center justify-between px-4">
      
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="md:hidden block">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Mk</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-black">
          <MessageSquare className="w-5 h-5" />
        </button>

        <button className="relative text-gray-600 hover:text-black">
          <Bell className="w-5 h-5" />
        </button>

        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Profile"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
