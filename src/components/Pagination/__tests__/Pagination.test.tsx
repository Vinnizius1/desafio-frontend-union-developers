import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination';

describe('Pagination component (RTL & Acessibilidade ARIA)', () => {
  it('deve renderizar a estrutura semântica nav com aria-label de navegação por páginas', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);

    const nav = screen.getByRole('navigation', { name: /navegação por páginas/i });
    expect(nav).toBeInTheDocument();
  });

  it('deve ter o atributo aria-current="page" apenas na página ativa', () => {
    render(<Pagination currentPage={2} totalPages={4} onPageChange={() => {}} />);

    const activePageButton = screen.getByRole('button', { name: /página atual, página 2/i });
    expect(activePageButton).toHaveAttribute('aria-current', 'page');
    expect(activePageButton).toBeDisabled();

    const otherPageButton = screen.getByRole('button', { name: /ir para a página 1/i });
    expect(otherPageButton).not.toHaveAttribute('aria-current');
    expect(otherPageButton).not.toBeDisabled();
  });

  it('deve chamar a função onPageChange com o número correto da página ao clicar', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

    const page3Button = screen.getByRole('button', { name: /ir para a página 3/i });
    await user.click(page3Button);

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('deve desabilitar o botão Anterior na primeira página e o Próximo na última página', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    // Primeira página: Anterior deve estar desabilitado
    const { rerender } = render(<Pagination currentPage={1} totalPages={3} onPageChange={handlePageChange} />);

    const prevButton = screen.getByRole('button', { name: /ir para a página anterior/i });
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByRole('button', { name: /ir para a próxima página/i });
    expect(nextButton).not.toBeDisabled();

    await user.click(nextButton);
    expect(handlePageChange).toHaveBeenCalledWith(2);

    // Re-render na última página (página 3): Próximo deve estar desabilitado
    rerender(<Pagination currentPage={3} totalPages={3} onPageChange={handlePageChange} />);

    expect(screen.getByRole('button', { name: /ir para a próxima página/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /ir para a página anterior/i })).not.toBeDisabled();
  });

  it('não deve renderizar nada se o totalPages for menor ou igual a 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />);
    expect(container.firstChild).toBeNull();
  });
});
