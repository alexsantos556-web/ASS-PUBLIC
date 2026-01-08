
import React from 'react';
import { AuditLog } from '../types';
import { ShieldCheck, Clock, User } from 'lucide-react';

interface AuditLogsProps {
  logs: AuditLog[];
}

const AuditLogs: React.FC<AuditLogsProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <ShieldCheck className="text-blue-600" size={20} />
          Logs de Auditoria
        </h3>
        <p className="text-xs text-slate-500 mt-1">Todas as ações realizadas no sistema são registradas e imutáveis.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Data/Hora</th>
              <th className="px-6 py-4">Usuário</th>
              <th className="px-6 py-4">Ação</th>
              <th className="px-6 py-4">Detalhes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  Nenhum log registrado nesta sessão.
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock size={12} />
                      {new Date(log.timestamp).toLocaleString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <User size={12} className="text-blue-500" />
                      <span className="font-bold text-slate-700">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 italic">
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
