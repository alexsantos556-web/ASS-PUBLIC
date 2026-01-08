
import React, { useState, useEffect } from 'react';
import { User, Resident, AuditLog, UserRole } from './types';
import { CURRENT_USER, MOCK_RESIDENTS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ResidentList from './components/ResidentList';
import ResidentDetail from './components/ResidentDetail';
import AuditLogsView from './components/AuditLogs';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'residents' | 'resident-detail' | 'logs'>('dashboard');
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null);
  const [residents, setResidents] = useState<Resident[]>(MOCK_RESIDENTS);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const addLog = (action: string, entity: string, details: string) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
      action,
      entity,
      details,
      timestamp: new Date().toISOString()
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleSelectResident = (id: string) => {
    setSelectedResidentId(id);
    setCurrentView('resident-detail');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        onNavigate={(view) => setCurrentView(view)} 
        user={CURRENT_USER}
      />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {currentView === 'dashboard' && 'Painel Geral'}
              {currentView === 'residents' && 'Gestão de Residentes'}
              {currentView === 'resident-detail' && 'Prontuário Individual'}
              {currentView === 'logs' && 'Auditoria de Sistema'}
            </h1>
            <p className="text-slate-500">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {CURRENT_USER.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{CURRENT_USER.name}</p>
              <p className="text-xs text-slate-400">{CURRENT_USER.role}</p>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {currentView === 'dashboard' && <Dashboard residents={residents} onSelectResident={handleSelectResident} />}
          {currentView === 'residents' && <ResidentList residents={residents} onSelect={handleSelectResident} />}
          {currentView === 'resident-detail' && selectedResidentId && (
            <ResidentDetail 
              residentId={selectedResidentId} 
              onBack={() => setCurrentView('residents')} 
              onLog={addLog}
            />
          )}
          {currentView === 'logs' && <AuditLogsView logs={logs} />}
        </div>
      </main>
    </div>
  );
};

export default App;
