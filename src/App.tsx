import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import router from './routes';
import { useAuthCheck } from './hooks/useAuthCheck';

function AppWithAuthCheck() {
  useAuthCheck(); // ✅ Hook ejecutándose en el nivel correcto
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppWithAuthCheck />
    </Provider>
  );
}

export default App
