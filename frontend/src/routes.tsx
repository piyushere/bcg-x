import { createBrowserRouter, Navigate } from 'react-router-dom';
import ApplicationEditor from './components/Applications/Editor';
import Applications from './components/Applications/Applications';
import Dashboard from './components/Applications/Dashboard';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Applications />,
      },
      {
        path: '/*',
        element: <Navigate to={'/home'} />,
      },
      {
        path: '/applications/:applId/edit',
        element: <ApplicationEditor />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
