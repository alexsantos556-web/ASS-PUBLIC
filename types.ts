
export enum UserRole {
  RT_ENFERMEIRO = 'Enfermeiro RT (Admin)',
  TECNICO_ENFERMAGEM = 'Técnico de Enfermagem',
  MEDICO = 'Médico',
  NUTRICIONISTA = 'Nutricionista',
  FISIOTERAPEUTA = 'Fisioterapeuta',
  FARMACEUTICO = 'Farmacêutico',
  OUTROS = 'Outros Profissionais'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface Resident {
  id: string;
  name: string;
  socialName?: string;
  birthDate: string;
  gender: string;
  cpf: string;
  rg: string;
  susCard: string;
  status: 'active' | 'inactive' | 'deceased' | 'discharged';
  responsibleName: string;
  responsiblePhone: string;
  admissionDate: string;
}

export interface VitalSigns {
  pa: string; // Pressure
  fc: number; // Heart rate
  fr: number; // Resp rate
  temp: number;
  spo2: number;
  gluco: number;
  weight: number;
  height: number;
  bmi: number;
  date: string;
}

export interface Evolution {
  id: string;
  residentId: string;
  userId: string;
  userName: string;
  role: UserRole;
  text: string;
  conduct: string;
  carePlan: string;
  timestamp: string;
}

export interface Prescription {
  id: string;
  residentId: string;
  medication: string;
  dosage: string; // e.g., "1 comp"
  frequency: string; // e.g., "8/8h"
  via: string;
  duration: string;
  prescriberId: string;
  prescriberName: string;
  active: boolean;
  times: string[]; // Auto-generated hours
}

export interface MedCheck {
  id: string;
  prescriptionId: string;
  residentId: string;
  time: string;
  status: 'administered' | 'refused' | 'issue';
  checkedBy: string;
  timestamp: string;
  justification?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
}
