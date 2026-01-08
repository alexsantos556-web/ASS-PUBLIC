
import React from 'react';
import { User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ShieldCheck, 
  LogOut,
  HeartPulse
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: any) => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'residents', label: 'Residentes', icon: Users },
    { id: 'logs', label: 'Auditoria', icon: ShieldCheck, roles: [UserRole.RT_ENFERMEIRO] },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-blue-800 text-white z-50 hidden lg:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white p-2 rounded-lg">
          <HeartPulse className="text-blue-800 w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">ANSA PRONT</span>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {menuItems.map((item) => {
          if (item.roles && !item.roles.includes(user.role)) return null;
          const Icon = item.icon;
          const isActive = currentView === item.id || (item.id === 'residents' && currentView === 'resident-detail');
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-blue-700 shadow-lg text-white font-medium' 
                : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-200 hover:text-white transition-colors">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
        <div className="mt-4 px-4 py-2 bg-blue-900/50 rounded-lg text-[10px] text-blue-300 uppercase tracking-widest font-semibold text-center">
          ILPI - Abrigo Nossa Senhora Aparecida
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
