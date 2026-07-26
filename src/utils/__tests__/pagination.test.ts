import { describe, it, expect } from 'vitest';
import { calculatePagination } from '../pagination';

describe('calculatePagination utility (TDD)', () => {
  it('deve calcular o total de páginas corretamente arredondando para cima (Math.ceil)', () => {
    // 25 itens com 10 por página deve resultar em 3 páginas
    const result = calculatePagination({ totalItems: 25, currentPage: 1, itemsPerPage: 10 });
    expect(result.totalPages).toBe(3);
  });

  it('deve retornar os índices de fatiamento corretos para a Página 1', () => {
    const result = calculatePagination({ totalItems: 25, currentPage: 1, itemsPerPage: 10 });
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(10);
    expect(result.hasPreviousPage).toBe(false);
    expect(result.hasNextPage).toBe(true);
  });

  it('deve retornar os índices de fatiamento corretos para a Página 2', () => {
    const result = calculatePagination({ totalItems: 25, currentPage: 2, itemsPerPage: 10 });
    expect(result.startIndex).toBe(10);
    expect(result.endIndex).toBe(20);
    expect(result.hasPreviousPage).toBe(true);
    expect(result.hasNextPage).toBe(true);
  });

  it('deve aplicar programação defensiva ajustando páginas negativas ou 0 para a Página 1 (Math.max)', () => {
    const resultMin = calculatePagination({ totalItems: 25, currentPage: -5, itemsPerPage: 10 });
    expect(resultMin.currentPage).toBe(1);
    expect(resultMin.startIndex).toBe(0);

    const resultZero = calculatePagination({ totalItems: 25, currentPage: 0, itemsPerPage: 10 });
    expect(resultZero.currentPage).toBe(1);
  });

  it('deve aplicar programação defensiva ajustando páginas maiores que o total para a última página real (Math.min)', () => {
    // Tentar acessar página 99 quando só existem 3 páginas deve clampar para página 3
    const resultMax = calculatePagination({ totalItems: 25, currentPage: 99, itemsPerPage: 10 });
    expect(resultMax.currentPage).toBe(3);
    expect(resultMax.hasNextPage).toBe(false);
    expect(resultMax.hasPreviousPage).toBe(true);
  });

  it('deve tratar corretamente o caso em que não há itens (totalItems = 0)', () => {
    const resultEmpty = calculatePagination({ totalItems: 0, currentPage: 1, itemsPerPage: 10 });
    expect(resultEmpty.totalPages).toBe(1);
    expect(resultEmpty.currentPage).toBe(1);
    expect(resultEmpty.hasNextPage).toBe(false);
    expect(resultEmpty.hasPreviousPage).toBe(false);
  });
});
