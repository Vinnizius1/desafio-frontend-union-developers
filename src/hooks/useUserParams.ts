import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { ViewMode } from '../components/ViewToggle/ViewToggle';

export function useUserParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const gender = (searchParams.get('gender') as 'all' | 'male' | 'female') || 'all';
  const viewMode = (searchParams.get('view') as ViewMode) || 'grid';
  const modalUserEmail = searchParams.get('user') || '';

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

  const openUserModal = useCallback(
    (email: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('user', email);
          return next;
        }
        // Sem { replace: true } para criar uma entrada no histórico do navegador (history.push)
      );
    },
    [setSearchParams]
  );

  const closeUserModal = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('user');
        return next;
      }
    );
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return {
    page,
    search,
    gender,
    viewMode,
    modalUserEmail,
    setPage,
    setSearch,
    setGender,
    setViewMode,
    openUserModal,
    closeUserModal,
    resetFilters,
  };
}
