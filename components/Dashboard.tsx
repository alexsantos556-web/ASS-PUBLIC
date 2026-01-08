
import React from 'react';
import { Resident } from '../types';
import { 
  Users, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DashboardProps {
  residents: Resident[];
  onSelectResident: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ residents, onSelectResident }) => {
  const stats = [
    { label: 'Total Residentes', value: residents.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Alertas Ativos', value: 3, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Risco Nutricional', value: 2, icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: 'Medicação em Dia', value: '92%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  const chartData = [
    { name: 'Jan', peso: 70.2 },
    { name: 'Fev', peso: 69.8 },
    { name: 'Mar', peso: 69.5 },
    { name: 'Abr', peso: 68.9 },
    { name: 'Mai', peso: 68.2 },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts & Critical Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              Atenção Prioritária
            </h3>
            <div className="space-y-4">
              {residents.slice(0, 3).map((r, idx) => (
                <div 
                  key={r.id} 
                  onClick={() => onSelectResident(r.id)}
                  className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors group"
                >
                  <p className="font-semibold text-slate-800 group-hover:text-blue-600">{r.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Perda de peso &gt; 5% nos últimos 30 dias</p>
                  <div className="mt-2 flex gap-1">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">NUTRIÇÃO</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">ENFERMAGEM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* General Trends */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingDown className="text-blue-500" size={20} />
              Média de Evolução de Peso (Institucional)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="peso" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#3b82f6' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
