import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserTabs } from './UserTabs';
import { User } from '../../types/user';

const mockUser: User = {
  id: { name: 'BR', value: '101' },
  gender: 'female',
  name: { title: 'Miss', first: 'Jennie', last: 'Nichols' },
  email: 'jennie@example.com',
  dob: { date: '1993-11-02T00:00:00.000Z', age: 30 },
  phone: '123456',
  cell: '654321',
  picture: { large: '', medium: '', thumbnail: '' },
  location: { street: { number: 12, name: 'Main St' }, city: 'NY', state: 'NY', country: 'USA', postcode: '10001' },
  nat: 'US',
};

describe('UserTabs Component', () => {
  it('deve renderizar a aba Info ativa por padrão exibindo os dados do usuário', () => {
    render(<UserTabs user={mockUser} />);

    expect(screen.getByRole('tab', { name: /info/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Jennie')).toBeInTheDocument();
    expect(screen.getByText('Nichols')).toBeInTheDocument();
    expect(screen.getByText('Miss')).toBeInTheDocument();
  });

  it('deve alternar para a aba Location ao clicar no botão', () => {
    render(<UserTabs user={mockUser} />);

    const locationTab = screen.getByRole('tab', { name: /location/i });
    fireEvent.click(locationTab);

    expect(locationTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Main St, nº 12')).toBeInTheDocument();
  });
});
