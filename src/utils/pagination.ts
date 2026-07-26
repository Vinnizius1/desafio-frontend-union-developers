export interface PaginationOptions {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
}

export interface PaginationResult {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Calcula os parâmetros de paginação e fatiamento com programação defensiva.
 * Função pura testada via TDD.
 */
export function calculatePagination(options: PaginationOptions): PaginationResult {
  const { totalItems, currentPage, itemsPerPage = 10 } = options;

  // 1. Calcular total de páginas (no mínimo 1 página mesmo se totalItems for 0)
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  // 2. Programação Defensiva: Ajusta a página atual para limites válidos [1, totalPages]
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  // 3. Calcular índices de início e fim para fatiar o array (.slice(startIndex, endIndex))
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // 4. Flags booleanas para desabilitar/habilitar botões de navegação
  const hasPreviousPage = validPage > 1;
  const hasNextPage = validPage < totalPages;

  return {
    currentPage: validPage,
    totalPages,
    itemsPerPage,
    totalItems,
    startIndex,
    endIndex,
    hasPreviousPage,
    hasNextPage,
  };
}
