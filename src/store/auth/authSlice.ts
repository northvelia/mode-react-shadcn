import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


import type { User, AuthState } from '@/types/auth/types';
// Estado inicial
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;