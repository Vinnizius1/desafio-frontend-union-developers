import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useUserParams } from './useUserParams';
import { ReactNode } from 'react';

const createWrapper = (initialRoute = '/') => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
  );
};

describe('useUserParams', () => {
  it('deve extrair os valores padrões da URL corretamente', () => {
    const { result } = renderHook(() => useUserParams(), {
      wrapper: createWrapper('/'),
    });

    expect(result.current.page).toBe(1);
    expect(result.current.search).toBe('');
    expect(result.current.gender).toBe('all');
  });

  it('deve ler os parâmetros presentes na URL', () => {
    const { result } = renderHook(() => useUserParams(), {
      wrapper: createWrapper('/?page=3&search=maria&gender=female'),
    });

    expect(result.current.page).toBe(3);
    expect(result.current.search).toBe('maria');
    expect(result.current.gender).toBe('female');
  });

  it('deve atualizar a página na URL e resetar a busca se desejado', () => {
    const { result } = renderHook(() => useUserParams(), {
      wrapper: createWrapper('/?page=1'),
    });

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it('deve resetar para a página 1 ao alterar o termo de busca', () => {
    const { result } = renderHook(() => useUserParams(), {
      wrapper: createWrapper('/?page=4'),
    });

    act(() => {
      result.current.setSearch('dev');
    });

    expect(result.current.search).toBe('dev');
    expect(result.current.page).toBe(1);
  });
});
