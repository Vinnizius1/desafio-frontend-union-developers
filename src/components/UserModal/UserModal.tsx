import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../../types/user';
import styles from './UserModal.module.scss';

export interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ user, isOpen, onClose }: UserModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-testid="modal-overlay"
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-user-name"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Fechar modal"
            >
              &times;
            </button>

            <div className={styles.header}>
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className={styles.avatar}
              />
              <div className={styles.titleGroup}>
                <h2 id="modal-user-name">
                  {user.name.title} {user.name.first} {user.name.last}
                </h2>
                <span className={styles.badge}>
                  {user.gender === 'male' ? 'Masculino' : 'Feminino'} • {user.dob.age} anos
                </span>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.infoGroup}>
                <label>E-mail</label>
                <p>{user.email}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Telefone / Celular</label>
                <p>{user.phone} / {user.cell}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Localização</label>
                <p>
                  {user.location.street.name}, nº {user.location.street.number} - {user.location.city},{' '}
                  {user.location.state} ({user.location.country})
                </p>
              </div>

              <div className={styles.infoGroup}>
                <label>Nacionalidade</label>
                <p>{user.nat}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
