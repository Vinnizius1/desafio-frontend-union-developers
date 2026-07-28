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
    expect(result.current.modalUserEmail).toBe('');
  });

  it('deve ler os parâmetros presentes na URL', () => {
    const { result } = renderHook(() => useUserParams(), {
      wrapper: createWrapper('/?page=3&search=maria&gender=female&user=maria@example.com'),
    });

    expect(result.current.page).toBe(3);
    expect(result.current.search).toBe('maria');
    expect(result.current.gender).toBe('female');
    expect(result.current.modalUserEmail).toBe('maria@example.com');
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

  it('deve abrir e fechar o modal alterando a URL', () => {
    const { result } = renderHook(() => useUserParams(), {
      wrapper: createWrapper('/'),
    });

    act(() => {
      result.current.openUserModal('safiya@example.com');
    });

    expect(result.current.modalUserEmail).toBe('safiya@example.com');

    act(() => {
      result.current.closeUserModal();
    });

    expect(result.current.modalUserEmail).toBe('');
  });
});
