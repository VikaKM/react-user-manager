import type { User } from "../types/user.types";

interface Params {
  users: User[];
  hiddenIds: number[];
  archivedIds: number[];
}

export function getUsersGroups({
  users,
  hiddenIds,
  archivedIds,
}: Params) {
  const visibleUsers = users.filter(
    (user) => !hiddenIds.includes(user.id)
  );

  const activeUsers = visibleUsers.filter(
    (user) => !archivedIds.includes(user.id)
  );

  const archivedUsers = visibleUsers.filter((user) =>
    archivedIds.includes(user.id)
  );

  return {
    activeUsers,
    archivedUsers,
  };
}