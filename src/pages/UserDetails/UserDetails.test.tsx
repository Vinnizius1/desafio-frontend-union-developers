import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserDetails } from './UserDetails';
import { User } from '../../types/user';

const mockUser: User = {
  id: { name: '1', value: '101' },
  gender: 'female',
  name: { title: 'Miss', first: 'Jennie', last: 'Nichols' },
  email: 'jennie@example.com',
  dob: { date: '1993-11-02T00:00:00.000Z', age: 30 },
  phone: '123456',
  cell: '654321',
  picture: { large: 'https://example.com/avatar.jpg', medium: '', thumbnail: '' },
  location: { street: { number: 12, name: 'Main St' }, city: 'NY', state: 'NY', country: 'USA', postcode: '10001' },
  nat: 'US',
};

const createWrapper = (initialRoute = '/user/jennie%40example.com') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/user/:email" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('UserDetails Page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar a tela de detalhes com avatar, nome, título e abas', () => {
    render(<UserDetails user={mockUser} />, { wrapper: createWrapper() });

    expect(screen.getByRole('heading', { name: /jennie nichols/i })).toBeInTheDocument();
    expect(screen.getAllByText('Miss').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('tab', { name: /info/i })).toBeInTheDocument();
  });
});
