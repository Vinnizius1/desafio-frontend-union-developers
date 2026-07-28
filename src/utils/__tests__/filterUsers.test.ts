import { describe, it, expect } from 'vitest';
import { filterUsers } from '../filterUsers';
import { User } from '../../types/user';

// Mock de dados de teste de usuários
const mockUsers: User[] = [
  {
    id: { name: 'BR', value: '123' },
    gender: 'female',
    name: { title: 'Ms', first: 'Ana', last: 'Silva' },
    email: 'ana.silva@example.com',
    dob: { date: '1995-05-10', age: 29 },
    phone: '11999998888',
    cell: '11999998888',
    picture: { large: '', medium: '', thumbnail: '' },
    location: { street: { number: 1, name: 'Rua A' }, city: 'São Paulo', state: 'SP', country: 'Brazil', postcode: '01000-000' },
    nat: 'BR',
  },
  {
    id: { name: 'BR', value: '456' },
    gender: 'male',
    name: { title: 'Mr', first: 'Carlos', last: 'Oliveira' },
    email: 'carlos.oliveira@example.com',
    dob: { date: '1982-10-15', age: 42 },
    phone: '21999997777',
    cell: '21999997777',
    picture: { large: '', medium: '', thumbnail: '' },
    location: { street: { number: 2, name: 'Rua B' }, city: 'Rio de Janeiro', state: 'RJ', country: 'Brazil', postcode: '20000-000' },
    nat: 'BR',
  },
  {
    id: { name: 'US', value: '789' },
    gender: 'female',
    name: { title: 'Mrs', first: 'Mariana', last: 'Smith' },
    email: 'mariana.smith@example.com',
    dob: { date: '2004-01-20', age: 20 },
    phone: '555-0199',
    cell: '555-0199',
    picture: { large: '', medium: '', thumbnail: '' },
    location: { street: { number: 3, name: 'Main St' }, city: 'New York', state: 'NY', country: 'USA', postcode: '10001' },
    nat: 'US',
  },
];

describe('filterUsers utility (TDD)', () => {
  it('deve retornar todos os usuários quando o termo de busca estiver vazio', () => {
    const result = filterUsers(mockUsers, { searchTerm: '' });
    expect(result).toHaveLength(3);
  });

  it('deve filtrar por primeiro nome ignorando maiúsculas e minúsculas (case-insensitive)', () => {
    const result = filterUsers(mockUsers, { searchTerm: 'ana' });
    expect(result).toHaveLength(2); // 'Ana' e 'Mariana'
    expect(result.map(u => u.name.first)).toEqual(['Ana', 'Mariana']);
  });

  it('deve filtrar por sobrenome (last name)', () => {
    const result = filterUsers(mockUsers, { searchTerm: 'oliveira' });
    expect(result).toHaveLength(1);
    expect(result[0].name.last).toBe('Oliveira');
  });

  it('deve filtrar por faixa etária (minAge e maxAge)', () => {
    const result = filterUsers(mockUsers, { searchTerm: '', minAge: 25, maxAge: 35 });
    expect(result).toHaveLength(1);
    expect(result[0].name.first).toBe('Ana');
    expect(result[0].dob.age).toBe(29);
  });

  it('deve filtrar por gênero (female / male)', () => {
    const females = filterUsers(mockUsers, { searchTerm: '', gender: 'female' });
    expect(females).toHaveLength(2);
    expect(females.every(u => u.gender === 'female')).toBe(true);

    const males = filterUsers(mockUsers, { searchTerm: '', gender: 'male' });
    expect(males).toHaveLength(1);
    expect(males[0].gender).toBe('male');
  });

  it('deve retornar array vazio quando nenhum usuário corresponder ao filtro', () => {
    const result = filterUsers(mockUsers, { searchTerm: 'NonExistingName' });
    expect(result).toEqual([]);
  });
});
