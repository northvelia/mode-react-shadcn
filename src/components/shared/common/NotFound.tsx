import { Button } from '../../ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Componente para página 404
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
      <h2 className="text-2xl font-bold mb-2">Página no encontrada</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        La página que buscas no existe o ha sido movida.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <Button onClick={() => navigate('/')}>
          <Home className="h-4 w-4 mr-2" />
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
