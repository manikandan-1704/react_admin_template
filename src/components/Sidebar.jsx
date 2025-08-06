import React from 'react';
import { Home, Settings, Users } from 'lucide-react';

const Sidebar = ({ isCollapsed }) => {
  return (
    <aside
      className={`h-screen bg-white border-r transition-all duration-300  
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <ul className="space-y-4 p-4">
        <li className="flex items-center gap-3 text-gray-700">
          <Home className="w-5 h-5" />
          {!isCollapsed && <span>Home</span>}
        </li>
        <li className="flex items-center gap-3 text-gray-700">
          <Users className="w-5 h-5" />
          {!isCollapsed && <span>Users</span>}
        </li>
        <li className="flex items-center gap-3 text-gray-700">
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
