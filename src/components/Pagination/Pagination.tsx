import styles from './Pagination.module.scss';
import chevronIcon from '../../assets/icons/chevron-left.svg';

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
  // Se houver apenas 1 página ou menos, não há necessidade de exibir os controles
  if (totalPages <= 1) return null;

  // Cria um array numérico de 1 até totalPages [1, 2, 3...]
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
              <img src={chevronIcon} alt="" width="16" height="16" />
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
            <span className={`${styles.pagination__icon} ${styles['pagination__icon--next']}`}>
              <img src={chevronIcon} alt="" width="16" height="16" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
