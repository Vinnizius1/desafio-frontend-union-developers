import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './Home';
import * as userService from '../../services/userService';

const createWrapper = (initialRoute = '/') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar o cabeçalho, campo de busca e lista de usuários', async () => {
    const mockUsers = [
      {
        id: { name: '1', value: '101' },
        gender: 'female',
        name: { title: 'Ms', first: 'Fernanda', last: 'Lima' },
        email: 'fernanda@example.com',
        dob: { date: '1992-03-10', age: 32 },
        phone: '1111-2222',
        cell: '3333-4444',
        picture: { large: 'https://example.com/avatar.jpg', medium: '', thumbnail: '' },
        location: { street: { number: 10, name: 'Rua X' }, city: 'São Paulo', state: 'SP', country: 'Brasil', postcode: '00000' },
        nat: 'BR',
      },
    ];

    vi.spyOn(userService, 'fetchUsers').mockResolvedValue({
      results: mockUsers as any,
      info: { seed: 'union_devs', results: 1, page: 1, version: '1.4' },
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByPlaceholderText(/buscar por nome ou sobrenome/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Fernanda Lima')).toBeInTheDocument();
    });
  });
});
