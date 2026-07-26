import { User, UserFilterState } from '../types/user';

/**
 * Filtra a lista de usuários com base nos critérios de busca (nome, sobrenome e idade).
 * Função pura testada via TDD.
 */
export function filterUsers(users: User[], filters: UserFilterState): User[] {
  const { searchTerm, minAge, maxAge } = filters;

  const normalizedSearch = searchTerm ? searchTerm.trim().toLowerCase() : '';

  return users.filter((user) => {
    // 1. Filtragem por Nome ou Sobrenome (Case-insensitive)
    if (normalizedSearch) {
      const firstName = user.name.first.toLowerCase();
      const lastName = user.name.last.toLowerCase();
      const matchesName = firstName.includes(normalizedSearch) || lastName.includes(normalizedSearch);

      if (!matchesName) {
        return false;
      }
    }

    // 2. Filtragem por Idade Mínima
    if (minAge !== undefined && user.dob.age < minAge) {
      return false;
    }

    // 3. Filtragem por Idade Máxima
    if (maxAge !== undefined && user.dob.age > maxAge) {
      return false;
    }

    return true;
  });
}
