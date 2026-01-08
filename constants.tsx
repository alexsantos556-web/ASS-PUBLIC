
import { UserRole, Resident, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Ana Silva',
  email: 'ana.rt@ansa.com',
  role: UserRole.RT_ENFERMEIRO,
  active: true
};

export const MOCK_RESIDENTS: Resident[] = [
  {
    id: 'r1',
    name: 'José dos Santos',
    birthDate: '1945-05-12',
    gender: 'Masculino',
    cpf: '123.456.789-00',
    rg: '12.345.678-X',
    susCard: '987 6543 2100 0000',
    status: 'active',
    responsibleName: 'Maria dos Santos',
    responsiblePhone: '(11) 98888-7777',
    admissionDate: '2023-10-01'
  },
  {
    id: 'r2',
    name: 'Benedita Oliveira',
    birthDate: '1938-11-20',
    gender: 'Feminino',
    cpf: '222.333.444-55',
    rg: '23.456.789-0',
    susCard: '111 2222 3333 4444',
    status: 'active',
    responsibleName: 'João Oliveira',
    responsiblePhone: '(11) 97777-6666',
    admissionDate: '2024-01-15'
  }
];
