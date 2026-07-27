import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserCard } from '../UserCard';
import { User } from '../../../types/user';

const mockUser: User = {
  id: { name: 'BR', value: '999' },
  gender: 'female',
  name: { title: 'Ms', first: 'Fernanda', last: 'Lima' },
  email: 'fernanda.lima@example.com',
  dob: { date: '1990-03-15', age: 34 },
  phone: '11988887777',
  cell: '11988887777',
  picture: {
    large: 'https://randomuser.me/api/portraits/women/44.jpg',
    medium: 'https://randomuser.me/api/portraits/women/44.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  location: {
    street: { number: 10, name: 'Av Paulista' },
    city: 'São Paulo',
    state: 'SP',
    country: 'Brazil',
    postcode: '01310-000',
  },
  nat: 'BR',
};

describe('UserCard component (RTL & Acessibilidade)', () => {
  it('deve renderizar o nome completo do usuário em uma tag h3', () => {
    render(<UserCard user={mockUser} />);

    const heading = screen.getByRole('heading', { level: 3, name: /fernanda lima/i });
    expect(heading).toBeInTheDocument();
  });

  it('deve ter o atributo alt da imagem com o nome completo do usuário', () => {
    render(<UserCard user={mockUser} />);

    const avatar = screen.getByAltText('Fernanda Lima');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUser.picture.large);
  });

  it('deve exibir as informações de idade, e-mail, telefone e localização', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(/34 anos/i)).toBeInTheDocument();
    expect(screen.getByText('fernanda.lima@example.com')).toBeInTheDocument();
    expect(screen.getByText('11988887777')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, Brazil')).toBeInTheDocument();
  });
});
