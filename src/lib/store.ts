import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  userName: string | null;
  completedModules: string[];
  xp: number;
  setUserName: (name: string) => void;
  completeModule: (id: string) => void;
  addXP: (amount: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userName: null,
      completedModules: [],
      xp: 0,
      setUserName: (name) => set({ userName: name }),
      completeModule: (id) => 
        set((state) => ({
          completedModules: state.completedModules.includes(id) 
            ? state.completedModules 
            : [...state.completedModules, id],
            xp: state.xp + 100
        })),
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
    }),
    {
      name: 'psyquant-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : ({} as Storage))),
    }
  )
);
