import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchUsers } from '../services/userService';
import { filterUsers } from '../utils/filterUsers';
import { calculatePagination } from '../utils/pagination';
import { RandomUserResponse } from '../types/user';

export interface UseUsersQueryParams {
  page?: number;
  gender?: 'all' | 'male' | 'female';
  search?: string;
  minAge?: number;
  maxAge?: number;
}

/**
 * Custom hook que integra a API randomuser.me com TanStack Query v5,
 * utilizando os utilitários de filtro e paginação testados em TDD.
 */
export function useUsersQuery({
  page = 1,
  gender = 'all',
  search = '',
  minAge,
  maxAge,
}: UseUsersQueryParams = {}) {
  const query = useQuery<RandomUserResponse, Error>({
    queryKey: ['users', { seed: 'union_devs', results: 50 }],
    queryFn: () => fetchUsers({ page: 1, results: 50, seed: 'union_devs' }),
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const rawUsers = query.data?.results ?? [];

  // 1. Aplica filtragem (nome, sobrenome, gênero e idade) usando a função utilitária do TDD
  const filteredUsers = filterUsers(rawUsers, {
    searchTerm: search,
    gender,
    minAge,
    maxAge,
  });

  // 2. Calcula paginação defensiva sobre o resultado filtrado
  const pagination = calculatePagination({
    totalItems: filteredUsers.length,
    currentPage: page,
    itemsPerPage: 10,
  });

  // 3. Fatia a lista para a página selecionada
  const paginatedUsers = filteredUsers.slice(pagination.startIndex, pagination.endIndex);

  return {
    ...query,
    users: paginatedUsers,
    allFilteredUsers: filteredUsers,
    totalCount: filteredUsers.length,
    totalPages: pagination.totalPages,
    currentPage: pagination.currentPage,
    hasPreviousPage: pagination.hasPreviousPage,
    hasNextPage: pagination.hasNextPage,
  };
}
