import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

// Página para recuperar contraseña
function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className='my-23'>
        <CardHeader className="text-center">
          {/* <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
          <CardDescription>
            Te ayudaremos a restablecer tu contraseña
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;
