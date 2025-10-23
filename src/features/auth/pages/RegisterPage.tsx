import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

// Página de registro
function RegisterPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className='my-23'>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate para comenzar a usar la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;
