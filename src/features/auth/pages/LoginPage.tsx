import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

// Página de login
function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className='my-23'>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              <Link 
                to="/forgot-password" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
