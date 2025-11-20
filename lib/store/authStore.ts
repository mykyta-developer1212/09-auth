import { create } from "zustand";

export interface AuthStore {
  user: {
    username: string;
    email: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));