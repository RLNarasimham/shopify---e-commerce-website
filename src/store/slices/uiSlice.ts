import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  selectedCategory: string;
  theme: 'light' | 'dark';
  currentPage: 'home' | 'products';
}

const initialState: UIState = {
  viewMode: 'grid',
  searchQuery: '',
  selectedCategory: '',
  theme: 'light',
  currentPage: 'home',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    
    setCurrentPage: (state, action: PayloadAction<'home' | 'products'>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setViewMode, setSearchQuery, setSelectedCategory, toggleTheme, setTheme, setCurrentPage } = uiSlice.actions;
export default uiSlice.reducer;