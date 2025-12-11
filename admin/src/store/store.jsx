import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userAuth = create(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      role: null,
      rememberMeToken: null,
      email: null,
      username: null,
      profile_image: null,
      last_login: null,

      setUser: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      logout: () =>
        set({
          token: null,
          refreshToken: null,
          role: null,
          rememberMeToken: null,
          email: null,
          username: null,
          profile_image: null,
          last_login: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
