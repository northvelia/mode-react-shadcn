import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@/store/auth/authSlice';
import uiSlice from '@/store/ui/uiSlice';


// Configuración del store de Redux
export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
  },
});

// Tipos para el estado global
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;