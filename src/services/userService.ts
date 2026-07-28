import { RandomUserResponse } from '../types/user';

export interface FetchUsersParams {
  page?: number;
  results?: number;
  seed?: string;
  gender?: string;
}

const API_BASE_URL = 'https://randomuser.me/api/';
const DEFAULT_SEED = 'union_devs';
const DEFAULT_RESULTS = 10;

/**
 * Busca usuários paginados da API randomuser.me.
 */
export async function fetchUsers(params: FetchUsersParams = {}): Promise<RandomUserResponse> {
  const {
    page = 1,
    results = DEFAULT_RESULTS,
    seed = DEFAULT_SEED,
    gender,
  } = params;

  const urlParams = new URLSearchParams({
    page: String(page),
    results: String(results),
    seed,
  });

  if (gender && gender !== 'all') {
    urlParams.append('gender', gender);
  }

  const response = await fetch(`${API_BASE_URL}?${urlParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Falha ao buscar usuários da API: ${response.status} ${response.statusText}`);
  }

  const data: RandomUserResponse = await response.json();
  return data;
}
