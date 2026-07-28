import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUsers } from './userService';

describe('userService - fetchUsers', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deve realizar a requisição HTTP com os parâmetros padrões (page=1, results=10, seed=union_devs)', async () => {
    const mockResponse = {
      results: [
        {
          name: { first: 'John', last: 'Doe', title: 'Mr' },
          email: 'john@example.com',
          gender: 'male',
        },
      ],
      info: { seed: 'union_devs', results: 10, page: 1, version: '1.4' },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal('fetch', mockFetch);

    const data = await fetchUsers();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('https://randomuser.me/api/');
    expect(calledUrl).toContain('page=1');
    expect(calledUrl).toContain('results=10');
    expect(calledUrl).toContain('seed=union_devs');
    expect(data).toEqual(mockResponse);
  });

  it('deve incluir o parâmetro gender quando for passado (male ou female)', async () => {
    const mockResponse = { results: [], info: { seed: 'union_devs', results: 10, page: 1, version: '1.4' } };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal('fetch', mockFetch);

    await fetchUsers({ page: 2, results: 10, gender: 'female' });

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('page=2');
    expect(calledUrl).toContain('gender=female');
  });

  it('não deve incluir o parâmetro gender quando for "all"', async () => {
    const mockResponse = { results: [], info: { seed: 'union_devs', results: 10, page: 1, version: '1.4' } };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal('fetch', mockFetch);

    await fetchUsers({ gender: 'all' });

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).not.toContain('gender=');
  });

  it('deve lançar um erro quando a resposta HTTP não for bem-sucedida (!response.ok)', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    vi.stubGlobal('fetch', mockFetch);

    await expect(fetchUsers()).rejects.toThrow('Falha ao buscar usuários da API: 500 Internal Server Error');
  });
});
