import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useUserParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const gender = (searchParams.get('gender') as 'all' | 'male' | 'female') || 'all';

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (newPage <= 1) {
            next.delete('page');
          } else {
            next.set('page', String(newPage));
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!newSearch) {
            next.delete('search');
          } else {
            next.set('search', newSearch);
          }
          // Reset para página 1 ao alterar busca
          next.delete('page');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setGender = useCallback(
    (newGender: 'all' | 'male' | 'female') => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (newGender === 'all') {
            next.delete('gender');
          } else {
            next.set('gender', newGender);
          }
          // Reset para página 1 ao alterar gênero
          next.delete('page');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return {
    page,
    search,
    gender,
    setPage,
    setSearch,
    setGender,
    resetFilters,
  };
}
