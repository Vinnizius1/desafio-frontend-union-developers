import { useState, useEffect } from 'react';

/**
 * Custom Hook useDebounce
 * Atrasa a atualização de um valor dinâmico até que o usuário pare de alterar por um intervalo especificado.
 *
 * @param value O valor a ser estabilizado (ex: termo de busca)
 * @param delay O tempo de atraso em milissegundos (padrão: 400ms)
 * @returns O valor estabilizado após o debounce
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Agenda a atualização do valor para após o tempo de delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Função de limpeza (Cleanup): Cancela o temporizador anterior se o valor mudar antes do tempo expirar
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
