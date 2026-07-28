import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useUsersQuery } from './useUsersQuery';
import * as userService from '../services/userService';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUsersQuery', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve buscar usuários e retornar a lista formatada com sucesso', async () => {
    const mockUsers = [
      {
        id: { name: '1', value: '101' },
        gender: 'female',
        name: { title: 'Ms', first: 'Maria', last: 'Silva' },
        email: 'maria@example.com',
        dob: { date: '1990-01-01', age: 34 },
        phone: '123456',
        cell: '654321',
        picture: { large: '', medium: '', thumbnail: '' },
        location: { street: { number: 1, name: 'Rua A' }, city: 'SP', state: 'SP', country: 'Brasil', postcode: '123' },
        nat: 'BR',
      },
      {
        id: { name: '2', value: '102' },
        gender: 'male',
        name: { title: 'Mr', first: 'João', last: 'Santos' },
        email: 'joao@example.com',
        dob: { date: '2000-01-01', age: 24 },
        phone: '123456',
        cell: '654321',
        picture: { large: '', medium: '', thumbnail: '' },
        location: { street: { number: 2, name: 'Rua B' }, city: 'RJ', state: 'RJ', country: 'Brasil', postcode: '456' },
        nat: 'BR',
      },
    ];

    vi.spyOn(userService, 'fetchUsers').mockResolvedValue({
      results: mockUsers as any,
      info: { seed: 'union_devs', results: 2, page: 1, version: '1.4' },
    });

    const { result } = renderHook(() => useUsersQuery({ page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.users).toHaveLength(2);
    expect(result.current.users[0].name.first).toBe('Maria');
  });

  it('deve filtrar os usuários localmente por termo de busca (search)', async () => {
    const mockUsers = [
      {
        name: { first: 'Maria', last: 'Silva' },
        dob: { age: 30 },
      },
      {
        name: { first: 'João', last: 'Santos' },
        dob: { age: 25 },
      },
    ];

    vi.spyOn(userService, 'fetchUsers').mockResolvedValue({
      results: mockUsers as any,
      info: { seed: 'union_devs', results: 2, page: 1, version: '1.4' },
    });

    const { result } = renderHook(() => useUsersQuery({ search: 'João' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].name.first).toBe('João');
  });
});
