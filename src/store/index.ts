import { create } from 'zustand';
import type { Character } from '../api/types';
import { getCharacters } from '../api/rickMorty';

// Define the app state interface
interface AppState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

// Define the app actions interface
interface AppActions {
  fetchCharacters: (page?: number) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

// Initial state
const initialState: AppState = {
  characters: [],
  loading: false,
  error: null,
};

// Create the Zustand store
export const useStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  // Fetch characters from the API
  fetchCharacters: async (page?: number) => {
    set({ loading: true, error: null });
    try {
      const data = await getCharacters(page);
      set({ characters: data.results, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch characters',
        loading: false,
      });
    }
  },

  // Clear error state
  clearError: () => set({ error: null }),

  // Reset all state to initial values
  reset: () => set(initialState),
}));
