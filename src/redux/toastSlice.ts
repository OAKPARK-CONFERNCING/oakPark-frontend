import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Toast>) {
      state.toasts.unshift(action.payload);
    },
    updateToast(state, action: PayloadAction<Partial<Toast> & { id: string }>) {
      const idx = state.toasts.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        state.toasts[idx] = { ...state.toasts[idx], ...action.payload };
      }
    },
    dismissToast(state, action: PayloadAction<string | undefined>) {
      if (action.payload) {
        const idx = state.toasts.findIndex(t => t.id === action.payload);
        if (idx !== -1) state.toasts[idx].open = false;
      } else {
        state.toasts.forEach(t => t.open = false);
      }
    },
    removeToast(state, action: PayloadAction<string | undefined>) {
      if (action.payload) {
        state.toasts = state.toasts.filter(t => t.id !== action.payload);
      } else {
        state.toasts = [];
      }
    },
  },
});

export const { addToast, updateToast, dismissToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer; 