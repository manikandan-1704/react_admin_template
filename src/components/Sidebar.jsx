import React from 'react';
import {
  Home,
  Users,
  CheckSquare,
  Lock,
  Settings,
  LogOut,
} from 'lucide-react';
import { NavLink as Link } from 'react-router-dom';

const Sidebar = ({ isCollapsed }) => {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/users' },
    { icon: <CheckSquare className="w-5 h-5" />, label: 'Todos', path: '/todos' },
    { icon: <Lock className="w-5 h-5" />, label: 'Access Control', path: '/access-control' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout', path: '/logout' },
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
            key={index}>
            <Link to={item.path || '#'}
            className={({isActive}) =>`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-600'
              : 'text-gray-700 hover:bg-gray-300/30 hover:text-blue-600'
          }`
        }
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
