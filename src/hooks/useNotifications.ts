import { useDispatch } from 'react-redux';
import { addNotification, removeNotification } from '../store/ui/uiSlice';
import { useCallback } from 'react';

// Hook para manejar notificaciones
export const useNotifications = () => {
  const dispatch = useDispatch();

  const showNotification = useCallback((
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    
    dispatch(addNotification({
      id,
      type,
      message,
      duration
    }));

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        dispatch(removeNotification(id));
      }, duration);
    }

    return id;
  }, [dispatch]);

  const removeNotificationById = useCallback((id: string) => {
    dispatch(removeNotification(id));
  }, [dispatch]);

  const showSuccess = useCallback((message: string, duration?: number) => {
    return showNotification('success', message, duration);
  }, [showNotification]);

  const showError = useCallback((message: string, duration?: number) => {
    return showNotification('error', message, duration);
  }, [showNotification]);

  const showWarning = useCallback((message: string, duration?: number) => {
    return showNotification('warning', message, duration);
  }, [showNotification]);

  const showInfo = useCallback((message: string, duration?: number) => {
    return showNotification('info', message, duration);
  }, [showNotification]);

  return {
    showNotification,
    removeNotification: removeNotificationById,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
