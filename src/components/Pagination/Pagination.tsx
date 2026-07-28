import styles from './Pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className={`${styles.navContainer} ${className}`} aria-label="Navegação por páginas">
      <ul className={styles.pagination}>
        {/* Botão Página Anterior */}
        <li className={styles.pagination__item}>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            aria-label="Ir para a página anterior"
            className={styles.pagination__button}
          >
            <span className={styles.pagination__icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </span>
          </button>
        </li>

        {/* Botões com os Números das Páginas */}
        {pageNumbers.map((page) => {
          const isCurrentPage = page === currentPage;

          return (
            <li key={page} className={styles.pagination__item}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                disabled={isCurrentPage}
                aria-current={isCurrentPage ? 'page' : undefined}
                aria-label={isCurrentPage ? `Página atual, Página ${page}` : `Ir para a página ${page}`}
                className={`${styles.pagination__button} ${
                  isCurrentPage ? styles['pagination__button--active'] : ''
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Botão Próxima Página */}
        <li className={styles.pagination__item}>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            aria-label="Ir para a próxima página"
            className={styles.pagination__button}
          >
            <span className={styles.pagination__icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
