import React from 'react';
import {
  Home,
  Users,
  Shield,
  Lock,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = ({ isCollapsed }) => {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'Users' },
    { icon: <Shield className="w-5 h-5" />, label: 'Roles' },
    { icon: <Lock className="w-5 h-5" />, label: 'Access Control' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout' },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] 
        bg-gradient-to-b from-white via-gray-100 to-gray-200 
        border-r transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      <ul className="space-y-3 p-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 cursor-pointer 
                       hover:bg-gray-300/30 hover:text-blue-600 transition-colors"
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
