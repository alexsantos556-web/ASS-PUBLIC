
import React, { useState } from 'react';
import { Resident } from '../types';
import { Search, Plus, UserCircle, ChevronRight, Phone } from 'lucide-react';

interface ResidentListProps {
  residents: Resident[];
  onSelect: (id: string) => void;
}

const ResidentList: React.FC<ResidentListProps> = ({ residents, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.cpf.includes(searchTerm)
  );

  const calculateAge = (birth: string) => {
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 font-medium">
          <Plus size={20} />
          Nova Admissão
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Residente</th>
              <th className="px-6 py-4">Idade</th>
              <th className="px-6 py-4">Admissão</th>
              <th className="px-6 py-4">Responsável</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(r => (
              <tr 
                key={r.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onSelect(r.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{r.name}</p>
                      <p className="text-xs text-slate-500">CPF: {r.cpf}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {calculateAge(r.birthDate)} anos
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(r.admissionDate).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <p className="font-medium">{r.responsibleName}</p>
                    <p className="text-slate-500 flex items-center gap-1">
                      <Phone size={10} /> {r.responsiblePhone}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    r.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {r.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Nenhum residente encontrado para esta busca.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentList;
