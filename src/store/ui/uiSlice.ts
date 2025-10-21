import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '@/types/ui/types';

// Estado inicial
const initialState: UIState = {
  isLoading: false,
  error: null,
  notifications: [],
};

// Slice para UI (loading global, errores, notificaciones)
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action: PayloadAction<{
      id: string;
      type: 'success' | 'error' | 'warning' | 'info';
      message: string;
      duration?: number;
    }>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { 
  setLoading, 
  setError, 
  clearError, 
  addNotification, 
  removeNotification, 
  clearNotifications 
} = uiSlice.actions;
export default uiSlice.reducer;