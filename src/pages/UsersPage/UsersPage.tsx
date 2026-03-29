import { useQuery } from "@tanstack/react-query";

import { Header } from "../../app/components/Header/Header";
import { Loader } from "../../app/components/Loader/Loader";
import { UserCard } from "../../app/components/UserCard/UserCard";

import { getUsers } from "../../app/features/users/api/usersApi";
import { getUsersGroups } from "../../app/features/users/lib/getUsersGroups";
import { mapUser } from "../../app/features/users/lib/mapUser";
import { useUsersStore } from "../../app/store/usersStore";

import styles from "./UsersPage.module.scss";

export function UsersPage() {
  const {
    hiddenUserIds,
    archivedUserIds,
    editedUsers,
    hideUser,
    archiveUser,
    unarchiveUser,
  } = useUsersStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <p>
            Ошибка загрузки:{" "}
            {error instanceof Error ? error.message : "Неизвестная ошибка"}
          </p>
        </div>
      </div>
    );
  }

  const firstSixUsers = data?.slice(0, 6) ?? [];

  const normalizedUsers = firstSixUsers.map((apiUser) => {
    const mappedUser = mapUser(apiUser);
    return editedUsers[mappedUser.id] ?? mappedUser;
  });

  const { activeUsers, archivedUsers } = getUsersGroups({
    users: normalizedUsers,
    hiddenIds: hiddenUserIds,
    archivedIds: archivedUserIds,
  });

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>Активные</h1>
            <div className={styles.divider} />
          </div>

          {activeUsers.length === 0 ? (
            <p className={styles.emptyText}>Нет активных пользователей</p>
          ) : (
            <div className={styles.cards}>
              {activeUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isArchived={false}
                  onArchive={archiveUser}
                  onUnarchive={unarchiveUser}
                  onHide={hideUser}
                />
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Архив</h2>
            <div className={styles.divider} />
          </div>

          {archivedUsers.length === 0 ? (
            <p className={styles.emptyText}>Архив пуст</p>
          ) : (
            <div className={styles.cards}>
              {archivedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isArchived
                  onArchive={archiveUser}
                  onUnarchive={unarchiveUser}
                  onHide={hideUser}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}