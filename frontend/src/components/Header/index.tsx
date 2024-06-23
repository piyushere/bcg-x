import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-around">
      <div className='className="text-left text-xl uppercase p-3 ml-8'>
        Electricity Applications
      </div>
      <div className="ml-auto h-auto flex items-center justify-center gap-4 mr-8 text-gray-600 underline">
        <NavLink
          className={({ isActive }) => (isActive ? 'text-gray-300' : '')}
          to={'/home'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-gray-300' : '')}
          to={'/dashboard'}
        >
          Dashboard
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
