import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userAuth = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      clearStorage: () => {
        sessionStorage.removeItem('user-auth');
        set({ user: null });
      },
    }),
    {
      name: 'user-auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);