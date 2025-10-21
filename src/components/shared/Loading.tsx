import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { cn } from '@/lib/utils';

// Componente de loading global
function Loading() {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  if (!isLoading) return null;

  return (
    <div className={cn('fixed inset-0 bg-black/50 flex items-center justify-center z-50')}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}

export default Loading;