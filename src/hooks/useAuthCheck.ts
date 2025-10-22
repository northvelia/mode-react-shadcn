import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout, setInitialized } from '@/store/auth/authSlice';
import AxiosInstance from '@/api/axiosInstance';

export const useAuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await AxiosInstance.get('/api/user', { withCredentials: true });
                dispatch(login(data));
            } catch {
                dispatch(logout());
            } finally {
                dispatch(setInitialized(true)); 
            }
        };

        checkAuth();
    }, [dispatch]);
};
