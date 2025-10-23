import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
  force?: boolean;
}

// Componente de loading mejorado
function Loading({ 
  size = 'md', 
  text = 'Cargando...', 
  fullScreen = false,
  className,
  force = false
}: LoadingProps) {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  if (!isLoading && !force) return null;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-black/50 flex items-center w-full justify-center z-50' 
    : 'flex items-center justify-center w-full p-8';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className={cn(sizeClasses[size], 'animate-spin text-primary')} />
        {text && (
          <p className="text-sm text-gray-50 text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export default Loading;