import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import initDarkMode from './lib/dark-mode';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

initDarkMode();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
