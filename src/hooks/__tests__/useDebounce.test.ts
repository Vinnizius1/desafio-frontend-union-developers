import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce custom hook (TDD)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve retornar o valor inicial imediatamente no primeiro render', () => {
    const { result } = renderHook(() => useDebounce('inicial', 400));
    expect(result.current).toBe('inicial');
  });

  it('não deve atualizar o valor debounced antes de expirar o tempo (delay)', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'ana', delay: 400 },
    });

    // Atualiza a prop para 'ana silva'
    rerender({ value: 'ana silva', delay: 400 });

    // Avança 200ms (metade do tempo) - valor ainda deve ser o antigo
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('ana');
  });

  it('deve atualizar o valor debounced após expirar o tempo configurado', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'ana', delay: 400 },
    });

    rerender({ value: 'ana silva', delay: 400 });

    // Avança 400ms completos - o valor debounced deve atualizar para 'ana silva'
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe('ana silva');
  });

  it('deve cancelar o temporizador anterior ao receber novos valores sucessivos (cleanup function)', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 400 },
    });

    // Simula digitação rápida de letras: 'a' -> 'an' -> 'ana'
    rerender({ value: 'an', delay: 400 });
    act(() => { vi.advanceTimersByTime(200); });

    rerender({ value: 'ana', delay: 400 });
    act(() => { vi.advanceTimersByTime(200); });

    // Até aqui se passaram 400ms do total, mas 'ana' só teve 200ms de vida -> ainda deve ser 'a'
    expect(result.current).toBe('a');

    // Avança mais 200ms para completar os 400ms da última letra ('ana')
    act(() => { vi.advanceTimersByTime(200); });

    expect(result.current).toBe('ana');
  });
});
