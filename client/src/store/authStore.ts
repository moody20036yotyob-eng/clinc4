import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  nameAr?: string;
  role: 'user' | 'admin' | 'USER' | 'ADMIN';
  emailVerified: boolean;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, token) => {
        localStorage.setItem('ecotrove_token', token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('ecotrove_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      refreshUser: async () => {
        const { token } = get();
        if (!token) return;
        try {
          set({ isLoading: true });
          const user = await api.get<User>('/auth/me');
          set({ user, isLoading: false });
        } catch {
          get().logout();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'ecotrove_auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
