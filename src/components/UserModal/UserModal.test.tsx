import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserModal } from './UserModal';
import { User } from '../../types/user';

const mockUser: User = {
  id: { name: '1', value: '123' },
  gender: 'female',
  name: { title: 'Ms', first: 'Ana', last: 'Pereira' },
  email: 'ana@example.com',
  dob: { date: '1995-05-15', age: 29 },
  phone: '(11) 98765-4321',
  cell: '(11) 91234-5678',
  picture: { large: 'https://example.com/avatar.jpg', medium: '', thumbnail: '' },
  location: {
    street: { number: 100, name: 'Avenida Paulista' },
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    postcode: '01310-100',
  },
  nat: 'BR',
};

describe('UserModal Component', () => {
  it('não deve renderizar nada quando isOpen for false', () => {
    render(<UserModal user={mockUser} isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('deve renderizar as informações do usuário corretamente quando aberto', () => {
    render(<UserModal user={mockUser} isOpen={true} onClose={() => {}} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Ms Ana Pereira')).toBeInTheDocument();
    expect(screen.getByText('ana@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Feminino • 29 anos/i)).toBeInTheDocument();
    expect(screen.getByText(/Avenida Paulista, nº 100/i)).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão de fechar', () => {
    const handleClose = vi.fn();
    render(<UserModal user={mockUser} isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /fechar modal/i });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao pressionar a tecla Escape', () => {
    const handleClose = vi.fn();
    render(<UserModal user={mockUser} isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
