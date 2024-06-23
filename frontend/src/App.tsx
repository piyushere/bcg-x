import { Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App relative">
      <Header />
      <main className="p-8 pt-2">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
