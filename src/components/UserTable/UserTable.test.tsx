import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserTable } from './UserTable';
import { User } from '../../types/user';

const mockUsers: User[] = [
  {
    id: { name: 'BR', value: '101' },
    gender: 'female',
    name: { title: 'Ms', first: 'Julia', last: 'Alves' },
    email: 'julia@example.com',
    dob: { date: '1995-04-10', age: 29 },
    phone: '12345',
    cell: '67890',
    picture: { large: '', medium: '', thumbnail: '' },
    location: { street: { number: 1, name: 'Rua A' }, city: 'SP', state: 'SP', country: 'Brasil', postcode: '000' },
    nat: 'BR',
  },
];

describe('UserTable Component', () => {
  it('deve renderizar a tabela com cabeçalhos semânticos e dados do usuário', () => {
    render(
      <MemoryRouter>
        <UserTable users={mockUsers} />
      </MemoryRouter>
    );

    expect(screen.getByRole('table', { name: /tabela de usuários/i })).toBeInTheDocument();
    expect(screen.getByText('Julia')).toBeInTheDocument();
    expect(screen.getByText('Alves')).toBeInTheDocument();
    expect(screen.getByText('29 anos')).toBeInTheDocument();
  });

  it('deve chamar onUserClick ao clicar no botão Ver Perfil', () => {
    const handleUserClick = vi.fn();
    render(
      <MemoryRouter>
        <UserTable users={mockUsers} onUserClick={handleUserClick} />
      </MemoryRouter>
    );

    const actionBtn = screen.getByRole('button', { name: /ver perfil de julia alves/i });
    fireEvent.click(actionBtn);

    expect(handleUserClick).toHaveBeenCalledWith(mockUsers[0]);
  });
});
