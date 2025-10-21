// Interfaces para el estado de UI
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
}