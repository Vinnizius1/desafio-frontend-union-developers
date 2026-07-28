import styles from './ViewToggle.module.scss';

export type ViewMode = 'grid' | 'table';

export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ viewMode, onViewChange, className = '' }: ViewToggleProps) {
  return (
    <div
      className={`${styles.toggleContainer} ${className}`}
      role="group"
      aria-label="Modo de visualização da lista"
    >
      {/* Botão Visualização em Grid / Cards */}
      <button
        type="button"
        className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
        onClick={() => onViewChange('grid')}
        aria-label="Visualização em Cards"
        aria-pressed={viewMode === 'grid'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>

      {/* Botão Visualização em Tabela */}
      <button
        type="button"
        className={`${styles.toggleButton} ${viewMode === 'table' ? styles.active : ''}`}
        onClick={() => onViewChange('table')}
        aria-label="Visualização em Tabela"
        aria-pressed={viewMode === 'table'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
