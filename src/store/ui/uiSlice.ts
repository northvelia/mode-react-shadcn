import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '@/types/ui/types';

// Estado inicial
const initialState: UIState = {
  isLoading: false,
};

// Slice para UI (loading global)
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;