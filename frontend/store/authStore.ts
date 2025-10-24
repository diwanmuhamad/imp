import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../lib/types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// persist() keeps state across page reloads (stored in localStorage)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: !!user && !!state.token,
        })),
      setToken: (token) =>
        set((state) => ({
          token,
          isAuthenticated: !!token && !!state.user,
        })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);
