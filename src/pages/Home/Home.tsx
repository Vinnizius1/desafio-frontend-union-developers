import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { UserCard } from '../../components/UserCard/UserCard';
import { UserTable } from '../../components/UserTable/UserTable';
import { ViewToggle } from '../../components/ViewToggle/ViewToggle';
import { Pagination } from '../../components/Pagination/Pagination';
import { UserModal } from '../../components/UserModal/UserModal';
import { Button } from '../../components/Button/Button';
import { useUserParams } from '../../hooks/useUserParams';
import { useUsersQuery } from '../../hooks/useUsersQuery';
import { User } from '../../types/user';
import styles from './Home.module.scss';

export function Home() {
  const {
    page,
    search,
    gender,
    viewMode,
    setPage,
    setSearch,
    setGender,
    setViewMode,
    resetFilters,
  } = useUserParams();

  const { users, isLoading, isError, isFetching, totalPages, refetch } = useUsersQuery({
    page,
    gender,
    search,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className={styles.home}>
      <Header />

      <main className={styles.mainContainer}>
        {/* Seção de Filtros & Busca & Alternância de Visualização */}
        <section className={styles.filterSection} aria-label="Filtros de usuários">
          <div className={styles.searchWrapper}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              placeholder="Buscar por nome ou sobrenome..."
            />
          </div>

          <div className={styles.controlsGroup}>
            <div className={styles.genderFilters} role="group" aria-label="Filtro de gênero">
              <button
                type="button"
                className={gender === 'all' ? styles.active : ''}
                onClick={() => setGender('all')}
              >
                Todos
              </button>
              <button
                type="button"
                className={gender === 'female' ? styles.active : ''}
                onClick={() => setGender('female')}
              >
                Feminino
              </button>
              <button
                type="button"
                className={gender === 'male' ? styles.active : ''}
                onClick={() => setGender('male')}
              >
                Masculino
              </button>
            </div>

            {/* Alternador de Visualização (Grid / Cards vs Tabela) */}
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </section>

        {/* Estado de Carregamento Inicial (Skeleton Loader) */}
        {isLoading && (
          <div className={styles.skeletonGrid} data-testid="skeleton-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className={styles.skeletonCard} />
            ))}
          </div>
        )}

        {/* Estado de Erro */}
        {isError && !isLoading && (
          <div className={styles.errorState}>
            <h3>Ops! Ocorreu um erro ao carregar os usuários.</h3>
            <p>Verifique sua conexão com a internet e tente novamente.</p>
            <Button onClick={() => refetch()}>Tentar Novamente</Button>
          </div>
        )}

        {/* Estado Vazio (Sem resultados) */}
        {!isLoading && !isError && users.length === 0 && (
          <div className={styles.emptyState}>
            <h3>Nenhum usuário encontrado</h3>
            <p>Tente ajustar o termo de busca ou alterar os filtros de gênero.</p>
            <Button variant="secondary" onClick={resetFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Sucesso: Grid de Cards OU Tabela de Usuários */}
        {!isLoading && !isError && users.length > 0 && (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid-view"
                className={`${styles.grid} ${isFetching ? styles.fetching : ''}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {users.map((user, idx) => (
                  <motion.div
                    key={user.email || idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                  >
                    <UserCard user={user} onClick={() => handleOpenModal(user)} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <UserTable users={users} />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Paginação */}
        {!isLoading && !isError && users.length > 0 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </main>

      {/* Modal de Detalhes do Usuário */}
      <UserModal user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
