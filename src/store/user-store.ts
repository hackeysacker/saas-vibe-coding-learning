import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserProfile, DashboardStats } from '@/types';

interface UserState {
  user: User | null;
  profile: UserProfile | null;
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setStats: (stats: DashboardStats | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  profile: null,
  stats: null,
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setStats: (stats) => set({ stats }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set(initialState),
    }),
    {
      name: 'vibe-user-storage',
      partialize: (state) => ({ user: state.user, profile: state.profile }),
    }
  )
);
