import { create } from "zustand";

export const useNotification = create((set) => ({
  notifications: [],
  addNotification: (message, type = "success") => {
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), message, type }],
    }));

    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.slice(1),
      }));
    }, 3000);
  },
}));
