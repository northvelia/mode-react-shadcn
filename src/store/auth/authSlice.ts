import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '@/types/auth/types';

// Estado inicial
const initialState: AuthState = {
  isAuthenticated: false,
  initialized: false,
  user: null,
  token: null,
};

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token?: string }>) => {
      state.isAuthenticated = true;
      state.initialized = true;
      state.user = action.payload.user;
      state.token = action.payload.token || null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.initialized = true;
      state.user = null;
      state.token = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { 
  login, 
  logout, 
  setInitialized, 
  updateUser, 
  setToken 
} = authSlice.actions;
export default authSlice.reducer;