import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled || isLoading ? styles['button--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className={styles.button__spinner} data-testid="button-spinner" aria-hidden="true" />
          <span>Carregando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
