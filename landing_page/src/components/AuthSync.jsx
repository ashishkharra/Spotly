import { useEffect } from "react";
import { userAuth } from "./Store";

const AuthSync = () => {
  useEffect(() => {
    const persistConfig = userAuth.persist.getOptions();
    const storedData = localStorage.getItem(persistConfig.name);

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.state?.user) {
          userAuth.getState().setUser(parsedData.state.user); // Move user to Zustand
        }
        localStorage.removeItem(persistConfig.name); // Clear localStorage
      } catch (error) {
        console.error("Error parsing stored authentication data:", error);
      }
    }

    return () => {
      // On unmount, store Zustand data back to localStorage
      const state = userAuth.getState();
      localStorage.setItem(
        persistConfig.name,
        JSON.stringify({
          state: persistConfig.partialize ? persistConfig.partialize(state) : state,
          version: persistConfig.version,
        })
      );
    };
  }, []);

  return null;
};

export default AuthSync;
