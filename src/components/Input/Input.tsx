import { ComponentPropsWithoutRef, useRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  onClear?: () => void;
  error?: string;
}

export function Input({
  label,
  value,
  onChange,
  onClear,
  error,
  placeholder = 'Buscar usuários...',
  type = 'search',
  className = '',
  disabled,
  id,
  'aria-label': ariaLabel,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const hasValue = Boolean(value && String(value).length > 0);

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    // Devolve imperativamente o foco ao input para excelente UX de teclado/leitores de tela
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.inputContainer__label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer__wrapper}>
        {/* Ícone de Lupa de Busca */}
        <span className={styles.inputContainer__icon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>

        <input
          ref={inputRef}
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel || (!label ? placeholder : undefined)}
          className={styles.inputContainer__element}
          {...rest}
        />

        {/* Botão Limpar Busca com Gestão de Foco */}
        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.inputContainer__clearButton}
            aria-label="Limpar texto da busca"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {error && <span className={styles.inputContainer__errorText}>{error}</span>}
    </div>
  );
}
