import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import router from './routes';
import Loading from './components/shared/Loading';
import { useAuthCheck } from './hooks/useAuthCheck';

function AppWithAuthCheck() {
  useAuthCheck(); // ✅ Aquí se ejecuta el hook
  return <Loading />;
}

function App() {

 

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <AppWithAuthCheck />
    </Provider>
  )
}

export default App
