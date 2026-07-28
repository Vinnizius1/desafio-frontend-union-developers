import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewToggle } from './ViewToggle';

describe('ViewToggle Component', () => {
  it('deve renderizar os botões de alternância e destacar o modo ativo', () => {
    render(<ViewToggle viewMode="grid" onViewChange={() => {}} />);

    const gridBtn = screen.getByRole('button', { name: /visualização em cards/i });
    const tableBtn = screen.getByRole('button', { name: /visualização em tabela/i });

    expect(gridBtn).toHaveAttribute('aria-pressed', 'true');
    expect(tableBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('deve chamar onViewChange ao clicar no botão de tabela', () => {
    const handleViewChange = vi.fn();
    render(<ViewToggle viewMode="grid" onViewChange={handleViewChange} />);

    const tableBtn = screen.getByRole('button', { name: /visualização em tabela/i });
    fireEvent.click(tableBtn);

    expect(handleViewChange).toHaveBeenCalledWith('table');
  });
});
