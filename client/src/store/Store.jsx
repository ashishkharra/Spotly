import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userAuth = create(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      role: null,

      setUser: (data) =>
        set({
          token: data.token || null,
          refreshToken: data.refreshToken || null,
          role: data.role || null,
        }),

      clearUser: () =>
        set({
          token: null,
          refreshToken: null,
          role: null,
        }),

      clearStorage: () => {
        localStorage.removeItem("user-auth");
        set({
          token: null,
          refreshToken: null,
          role: null,
        });
      },
    }),
    {
      name: "user-auth",
      getStorage: () => localStorage,
    }
  )
);