import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../../ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Componente para manejar errores de React
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Oops! Algo salió mal</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
          </p>
          <div className="flex gap-4">
            <Button onClick={this.handleReset} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de nuevo
            </Button>
            <Button onClick={() => window.location.reload()}>
              Recargar página
            </Button>
          </div>
           {import.meta.env.DEV && this.state.error && (
            <details className="mt-4 p-4 bg-gray-100 rounded text-left max-w-2xl">
              <summary className="cursor-pointer font-semibold">Detalles del error</summary>
              <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
