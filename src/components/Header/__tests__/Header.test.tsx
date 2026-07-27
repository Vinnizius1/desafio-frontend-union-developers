import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header / Navbar component (RTL & Acessibilidade SEO)', () => {
  it('deve renderizar a estrutura semântica header com papel de banner', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('deve ter um único h1 por rota contendo o título principal da aplicação', () => {
    render(<Header title="Desafio Frontend - Union Developers" />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Desafio Frontend - Union Developers');
  });

  it('deve renderizar o indicador de versão e o link externo para o GitHub com atributo rel="noopener noreferrer"', () => {
    render(<Header version="v1.0.0" githubUrl="https://github.com/Vinnizius1/desafio-frontend-union-developers" />);

    expect(screen.getByText('v1.0.0')).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /abrir repositório no github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Vinnizius1/desafio-frontend-union-developers');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
