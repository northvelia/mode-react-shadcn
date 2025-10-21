import axios from 'axios';

const apiUrl: string | undefined = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined in the environment variables');
}

const AxiosInstance = axios.create({
  baseURL: `${apiUrl}/`,
  withCredentials: true, // CRÍTICO: Permite enviar cookies
  withXSRFToken: true, // CRÍTICO: Maneja el token CSRF automáticamente
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});




export default AxiosInstance;