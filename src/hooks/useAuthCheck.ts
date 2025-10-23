import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout, setInitialized } from '@/store/auth/authSlice';
import AxiosInstance from '@/api/axiosInstance';
import { useLoading } from './useLoading';

export const useAuthCheck = () => {
    const dispatch = useDispatch();
    const { setGlobalLoading } = useLoading();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setGlobalLoading(true);
                const { data } = await AxiosInstance.get('/api/user', { withCredentials: true });
                dispatch(login(data));
            } catch {
                setGlobalLoading(false);
                dispatch(logout());
            } finally {
                setGlobalLoading(false);
                dispatch(setInitialized(true)); 
            }
        };

        checkAuth();
    }, [dispatch]);
};
