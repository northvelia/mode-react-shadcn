import { useDispatch } from 'react-redux';
import { setLoading } from '../store/ui/uiSlice';

// Hook para manejar el estado de loading global
export const useLoading = () => {
  const dispatch = useDispatch();

  const setGlobalLoading = (isLoading: boolean) => {
    dispatch(setLoading(isLoading));
  };

  const withLoading = async <T>(asyncFunction: () => Promise<T>): Promise<T> => {
    try {
      setGlobalLoading(true);
      const result = await asyncFunction();
      return result;
    } finally {
      setGlobalLoading(false);
    }
  };

  return {
    setGlobalLoading,
    withLoading
  };
};
