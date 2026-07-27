import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input / SearchBar component (RTL & Acessibilidade)', () => {
  it('deve renderizar o campo de busca por papel semântico searchbox e placeholder', () => {
    render(<Input placeholder="Buscar por nome..." />);

    const searchInput = screen.getByRole('searchbox', { name: /buscar por nome.../i });
    expect(searchInput).toBeInTheDocument();
  });

  it('deve disparar o evento onChange conforme o usuário digita', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input value="" onChange={handleChange} placeholder="Buscar..." />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'Ana');

    expect(handleChange).toHaveBeenCalled();
  });

  it('deve exibir o botão de limpar quando houver texto e retornar o foco ao input após clicar no "X"', async () => {
    const handleClear = vi.fn();
    const user = userEvent.setup();

    render(<Input value="Carlos" onChange={() => {}} onClear={handleClear} />);

    const clearButton = screen.getByRole('button', { name: /limpar texto da busca/i });
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);

    // Valida a gestão imperativa de foco do useRef (o input deve estar focado)
    const input = screen.getByRole('searchbox');
    expect(input).toHaveFocus();
  });

  it('deve desabilitar o campo quando a prop disabled for verdadeira', () => {
    render(<Input disabled placeholder="Desabilitado" />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeDisabled();
  });
});
