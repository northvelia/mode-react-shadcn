import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import router from './routes';
import Loading from './components/shared/Loading';


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Loading />
    </Provider>
  )
}

export default App
