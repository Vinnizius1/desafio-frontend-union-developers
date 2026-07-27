import { User } from '../../types/user';
import styles from './UserCard.module.scss';

export interface UserCardProps {
  user: User;
  className?: string;
}

export function UserCard({ user, className = '' }: UserCardProps) {
  const fullName = `${user.name.first} ${user.name.last}`;
  const locationString = `${user.location.city}, ${user.location.country}`;

  return (
    <article className={`${styles.card} ${className}`} aria-label={`Card de ${fullName}`}>
      <header className={styles.card__header}>
        {/* Imagem com alt estrito com o nome da pessoa (regra W3C de acessibilidade) */}
        <img
          src={user.picture.large || user.picture.medium}
          alt={fullName}
          className={styles.card__avatar}
          loading="lazy"
        />

        <div className={styles.card__titleGroup}>
          <h3 className={styles.card__name}>{fullName}</h3>
          <span className={styles.card__badge}>{user.dob.age} anos</span>
        </div>
      </header>

      <div className={styles.card__divider} aria-hidden="true" />

      <ul className={styles.card__infoList}>
        {/* Email */}
        <li className={styles.card__infoItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>{user.email}</span>
        </li>

        {/* Telefone */}
        <li className={styles.card__infoItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>{user.phone || user.cell}</span>
        </li>

        {/* Localização */}
        <li className={styles.card__infoItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{locationString}</span>
        </li>
      </ul>
    </article>
  );
}
