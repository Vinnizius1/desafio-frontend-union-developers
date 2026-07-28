import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import styles from './UserTable.module.scss';

export interface UserTableProps {
  users: User[];
  onUserClick?: (user: User) => void;
  className?: string;
}

export function UserTable({ users, onUserClick, className = '' }: UserTableProps) {
  const navigate = useNavigate();

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return 'N/A';
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return isoDate;
    }
  };

  const handleAction = (user: User) => {
    if (onUserClick) {
      onUserClick(user);
    } else {
      navigate(`/user/${encodeURIComponent(user.email)}`);
    }
  };

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table} aria-label="Tabela de Usuários">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Primeiro Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">Título</th>
            <th scope="col">Data Nasc.</th>
            <th scope="col">Idade</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            const userId = user.id?.value || user.id?.name || `user-${idx}`;

            return (
              <tr
                key={user.email || idx}
                onClick={() => handleAction(user)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction(user);
                  }
                }}
                aria-label={`Linha do usuário ${user.name.first} ${user.name.last}`}
              >
                <td className={styles.idCell}>{userId}</td>
                <td className={styles.clickableName}>{user.name.first}</td>
                <td className={styles.clickableName}>{user.name.last}</td>
                <td>{user.name.title}</td>
                <td>{formatDate(user.dob?.date)}</td>
                <td>{user.dob?.age} anos</td>
                <td>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(user);
                    }}
                    aria-label={`Ver perfil de ${user.name.first} ${user.name.last}`}
                  >
                    Ver Perfil
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
