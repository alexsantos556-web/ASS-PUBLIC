
import React, { useState, useEffect } from 'react';
import { Resident, VitalSigns, Evolution, Prescription, MedCheck, UserRole } from '../types';
import { MOCK_RESIDENTS, CURRENT_USER } from '../constants';
import { 
  ArrowLeft, 
  Calendar, 
  Dna, 
  Stethoscope, 
  Pill, 
  LineChart, 
  History, 
  Printer, 
  Save,
  Plus,
  BrainCircuit,
  AlertCircle
} from 'lucide-react';
import { getResidentInsights } from '../services/geminiService';

interface ResidentDetailProps {
  residentId: string;
  onBack: () => void;
  onLog: (action: string, entity: string, details: string) => void;
}

const ResidentDetail: React.FC<ResidentDetailProps> = ({ residentId, onBack, onLog }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'clinical' | 'meds' | 'evolutions' | 'timeline'>('info');
  const [resident, setResident] = useState<Resident | undefined>(MOCK_RESIDENTS.find(r => r.id === residentId));
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [newEvolution, setNewEvolution] = useState('');
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    // Simulated load of evolutions
    setEvolutions([
      {
        id: 'e1',
        residentId,
        userId: 'u1',
        userName: 'Ana Silva',
        role: UserRole.RT_ENFERMEIRO,
        text: 'Paciente estável, alimentando-se bem. Sono preservado.',
        conduct: 'Manter cuidados gerais.',
        carePlan: 'Banho de sol matinal.',
        timestamp: new Date().toISOString()
      }
    ]);
  }, [residentId]);

  const handleAddEvolution = () => {
    if (!newEvolution.trim()) return;
    const evo: Evolution = {
      id: Math.random().toString(36).substr(2, 9),
      residentId,
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
      role: CURRENT_USER.role,
      text: newEvolution,
      conduct: 'Aguardando avaliação',
      carePlan: 'Seguir protocolo',
      timestamp: new Date().toISOString()
    };
    setEvolutions([evo, ...evolutions]);
    setNewEvolution('');
    onLog('Criação de Evolução', 'evolucao', `Evolução adicionada para ${resident?.name}`);
  };

  const generateAIInsights = async () => {
    if (!resident) return;
    setLoadingInsights(true);
    const historyText = evolutions.map(e => `[${e.timestamp}] ${e.role}: ${e.text}`).join('\n');
    const res = await getResidentInsights(resident.name, historyText);
    setInsights(res);
    setLoadingInsights(false);
  };

  if (!resident) return <div>Residente não encontrado</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Lista
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-all shadow-sm">
            <Printer size={18} />
            Exportar PDF
          </button>
          <button 
            onClick={generateAIInsights}
            disabled={loadingInsights}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
          >
            <BrainCircuit size={18} />
            {loadingInsights ? 'Analisando...' : 'Insight IA'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
          <Dna size={48} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-800">{resident.name}</h2>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Ativo</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Nascimento</p><p className="font-semibold">{new Date(resident.birthDate).toLocaleDateString('pt-BR')}</p></div>
            <div><p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Cartão SUS</p><p className="font-semibold">{resident.susCard}</p></div>
            <div><p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Responsável</p><p className="font-semibold">{resident.responsibleName}</p></div>
            <div><p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Admissão</p><p className="font-semibold">{new Date(resident.admissionDate).toLocaleDateString('pt-BR')}</p></div>
          </div>
        </div>
      </div>

      {insights && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl animate-in zoom-in duration-300">
          <div className="flex items-center gap-2 mb-3 text-indigo-700">
            <BrainCircuit size={20} />
            <h4 className="font-bold">Análise Inteligente ANSA</h4>
          </div>
          <div className="text-sm text-indigo-900 whitespace-pre-wrap leading-relaxed">
            {insights}
          </div>
          <p className="mt-4 text-[10px] text-indigo-400 font-medium italic">* Esta análise é gerada por inteligência artificial e deve ser validada pelo profissional responsável.</p>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-8 overflow-x-auto scrollbar-hide">
        {[
          { id: 'info', label: 'Dados Pessoais', icon: Calendar },
          { id: 'clinical', label: 'Triagem/Clínico', icon: Stethoscope },
          { id: 'meds', label: 'Prescrições', icon: Pill },
          { id: 'evolutions', label: 'Evoluções', icon: LineChart },
          { id: 'timeline', label: 'Linha do Tempo', icon: History },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-all whitespace-nowrap ${
                isActive ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'info' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-bold text-slate-800 border-l-4 border-blue-500 pl-3">Identificação Civil</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><label className="text-slate-400 block mb-1">Nome Social</label><p className="font-medium">{resident.socialName || '-'}</p></div>
                <div><label className="text-slate-400 block mb-1">Sexo</label><p className="font-medium">{resident.gender}</p></div>
                <div><label className="text-slate-400 block mb-1">CPF</label><p className="font-medium">{resident.cpf}</p></div>
                <div><label className="text-slate-400 block mb-1">RG</label><p className="font-medium">{resident.rg}</p></div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">Contatos e Responsáveis</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><label className="text-slate-400 block mb-1">Responsável Legal</label><p className="font-medium">{resident.responsibleName}</p></div>
                <div><label className="text-slate-400 block mb-1">Telefone</label><p className="font-medium">{resident.responsiblePhone}</p></div>
                <div><label className="text-slate-400 block mb-1">Grau Parentesco</label><p className="font-medium">Filho(a)</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evolutions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold mb-4 text-slate-800">Nova Evolução Multiprofissional</h4>
              <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
                placeholder="Descreva o estado do paciente, intercorrências e condutas..."
                value={newEvolution}
                onChange={(e) => setNewEvolution(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleAddEvolution}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2"
                >
                  <Save size={18} />
                  Registrar Evolução
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {evolutions.map(evo => (
                <div key={evo.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-blue-600">
                        {evo.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{evo.userName}</p>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{evo.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{new Date(evo.timestamp).toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap mb-4">
                    {evo.text}
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Conduta</p>
                      <p className="text-xs font-medium text-slate-700">{evo.conduct}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Plano de Cuidado</p>
                      <p className="text-xs font-medium text-slate-700">{evo.carePlan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meds' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800">Prescrições Ativas</h4>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium">
                <Plus size={18} />
                Nova Prescrição
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              <div className="py-4 grid grid-cols-12 gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="col-span-4">Medicamento</div>
                <div className="col-span-2 text-center">Dosagem</div>
                <div className="col-span-2 text-center">Frequência</div>
                <div className="col-span-2 text-center">Via</div>
                <div className="col-span-2 text-right">Status</div>
              </div>
              <div className="py-6 grid grid-cols-12 gap-4 items-center group">
                <div className="col-span-4">
                  <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Losartana Potássica</p>
                  <p className="text-xs text-slate-500">50mg</p>
                </div>
                <div className="col-span-2 text-center text-sm font-medium">1 Comprimido</div>
                <div className="col-span-2 text-center">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg uppercase">12/12h</span>
                </div>
                <div className="col-span-2 text-center text-sm">Via Oral</div>
                <div className="col-span-2 text-right">
                  <span className="text-emerald-500 flex items-center justify-end gap-1 font-bold text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> ATIVO
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={18} />
              <div>
                <p className="text-sm font-bold text-amber-800">Checagem Pendente</p>
                <p className="text-xs text-amber-700">Existem 2 medicamentos com horário de administração vencido ou próximo.</p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'clinical' || activeTab === 'timeline') && (
          <div className="flex items-center justify-center h-full text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-center">
              <History size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium">Módulo em desenvolvimento para demonstração.</p>
              <p className="text-xs">Dados de exemplo ativos nas abas Info, Meds e Evoluções.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidentDetail;
