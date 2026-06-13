
import { Resident, AuditLog, Evolution, Prescription } from '../types';
import { MOCK_RESIDENTS, MOCK_EVOLUTIONS } from '../constants';

const KEYS = {
  residents: 'ansp_residents',
  logs: 'ansp_logs',
  evolutions: (id: string) => `ansp_evolutions_${id}`,
  prescriptions: (id: string) => `ansp_prescriptions_${id}`,
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getResidents: (): Resident[] => load(KEYS.residents, MOCK_RESIDENTS),
  setResidents: (v: Resident[]) => save(KEYS.residents, v),

  getLogs: (): AuditLog[] => load(KEYS.logs, []),
  setLogs: (v: AuditLog[]) => save(KEYS.logs, v),

  getEvolutions: (residentId: string): Evolution[] =>
    load(KEYS.evolutions(residentId), MOCK_EVOLUTIONS[residentId] ?? []),
  setEvolutions: (residentId: string, v: Evolution[]) =>
    save(KEYS.evolutions(residentId), v),

  getPrescriptions: (residentId: string): Prescription[] =>
    load(KEYS.prescriptions(residentId), []),
  setPrescriptions: (residentId: string, v: Prescription[]) =>
    save(KEYS.prescriptions(residentId), v),
};
