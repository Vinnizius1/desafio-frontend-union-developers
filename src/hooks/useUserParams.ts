import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { ViewMode } from '../components/ViewToggle/ViewToggle';

export function useUserParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const gender = (searchParams.get('gender') as 'all' | 'male' | 'female') || 'all';
  const viewMode = (searchParams.get('view') as ViewMode) || 'grid';

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
          next.delete('page');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setViewMode = useCallback(
    (newViewMode: ViewMode) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (newViewMode === 'grid') {
            next.delete('view');
          } else {
            next.set('view', newViewMode);
          }
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
    viewMode,
    setPage,
    setSearch,
    setGender,
    setViewMode,
    resetFilters,
  };
}
