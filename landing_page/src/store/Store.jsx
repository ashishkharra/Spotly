import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userAuth = create(persist(
  (set) => ({
    user: null,
    setUser: (token) => set({ token: token }),
    clearUser: () => set({ token: null }),
    clearStorage: () => {
      localStorage.removeItem('user-auth');
      set({ token: null });
    },
  }),
  {
    name: 'user-auth',
    getStorage: () => localStorage
  }
));
