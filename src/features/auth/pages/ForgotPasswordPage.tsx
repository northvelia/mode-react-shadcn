import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

// Página para recuperar contraseña
function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className='my-23'>
        <CardHeader className="text-center">
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;
