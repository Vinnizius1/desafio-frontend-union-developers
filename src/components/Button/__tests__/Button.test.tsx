import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button component (RTL & Acessibilidade)', () => {
  it('deve renderizar o texto do botão corretamente por acessibilidade (getByRole)', () => {
    render(<Button>Enviar Filtros</Button>);

    const button = screen.getByRole('button', { name: /enviar filtros/i });
    expect(button).toBeInTheDocument();
  });

  it('deve disparar o evento onClick quando o usuário clicar no botão', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Salvar</Button>);

    const button = screen.getByRole('button', { name: /salvar/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não deve disparar onClick quando o botão estiver desabilitado (disabled)', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button disabled onClick={handleClick}>Desabilitado</Button>);

    const button = screen.getByRole('button', { name: /desabilitado/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('deve exibir indicador de carregamento e desabilitar cliques durante isLoading', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button isLoading onClick={handleClick}>Processando</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    expect(screen.getByText(/carregando.../i)).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
