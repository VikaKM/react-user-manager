import { create } from "zustand";
import type { User } from '../features/users/types/user.types';

interface UsersStore {
  hiddenUserIds: number[];
  archivedUserIds: number[];
  editedUsers: Record<number, User>;

  hideUser: (id: number) => void;
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  saveEditedUser: (user: User) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  hiddenUserIds: [],
  archivedUserIds: [],
  editedUsers: {},

  hideUser: (id) =>
    set((state) => ({
      hiddenUserIds: state.hiddenUserIds.includes(id)
        ? state.hiddenUserIds
        : [...state.hiddenUserIds, id],
    })),

  archiveUser: (id) =>
    set((state) => ({
      archivedUserIds: state.archivedUserIds.includes(id)
        ? state.archivedUserIds
        : [...state.archivedUserIds, id],
    })),

  unarchiveUser: (id) =>
    set((state) => ({
      archivedUserIds: state.archivedUserIds.filter((userId) => userId !== id),
    })),

  saveEditedUser: (user) =>
    set((state) => ({
      editedUsers: {
        ...state.editedUsers,
        [user.id]: user,
      },
    })),
}));