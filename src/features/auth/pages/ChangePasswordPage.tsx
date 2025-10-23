import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import ChangePasswordForm from '../components/ChangePasswordForm';

// Página para cambiar contraseña
function ChangePasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className='my-23'>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cambiar Contraseña</CardTitle>
          <CardDescription>
            Actualiza tu contraseña para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ChangePasswordPage;
