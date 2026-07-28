import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from '../../components/Header/Header';
import { UserTabs } from '../../components/UserTabs/UserTabs';
import { useUsersQuery } from '../../hooks/useUsersQuery';
import { User } from '../../types/user';
import styles from './UserDetails.module.scss';

export interface UserDetailsProps {
  user?: User;
}

export function UserDetails({ user: userProp }: UserDetailsProps = {}) {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const queryResult = useUsersQuery();
  const rawUsers: User[] = queryResult.rawUsers ?? [];
  const isLoading = queryResult.isLoading;

  const decodedEmail = email ? decodeURIComponent(email) : '';

  const user =
    userProp ||
    rawUsers.find(
      (u: User) => u.email === email || u.email === decodedEmail || encodeURIComponent(u.email) === email
    );

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        {/* Botão Voltar */}
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Voltar para a lista de usuários"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>

        {isLoading && !user && (
          <div className={styles.notFound}>Carregando detalhes do usuário...</div>
        )}

        {!isLoading && !user && (
          <div className={styles.notFound}>
            <h2>Usuário não encontrado</h2>
            <p>O perfil solicitado não está mais disponível no cache da aplicação.</p>
          </div>
        )}

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header do Perfil Fiel ao Figma */}
            <div className={styles.profileHeader}>
              <img
                src={user.picture.large || user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
                className={styles.avatar}
              />
              <h1 className={styles.name}>
                {user.name.first} {user.name.last}
              </h1>
              <span className={styles.title}>{user.name.title}</span>
            </div>

            {/* Abas Info, Location e Login */}
            <div className={styles.content}>
              <UserTabs user={user} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
