import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/auth/authSlice';
import { loginUser, logoutUser } from './api';
import { useNavigate } from 'react-router-dom';

// Hook para manejar login
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      dispatch(login(data));
      navigate('/c');
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { handleLogin };
};

// Hook para manejar logout
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const success = await logoutUser();
      if (success) {
        dispatch(logout());
        navigate('/login');
      }
      return { success };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { handleLogout };
};