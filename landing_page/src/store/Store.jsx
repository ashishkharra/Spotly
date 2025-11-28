import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userAuth = create(persist(
  (set) => ({
    user: null,
    setUser: (user) => set({ user: user.id }),
    clearUser: () => set({ user: null }),
    clearStorage: () => {
      localStorage.removeItem('user-auth');
      set({ user: null });
    },
  }),
  {
    name: 'user-auth',
    getStorage: () => localStorage
  }
));
