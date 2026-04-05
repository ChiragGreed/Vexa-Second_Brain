import React, { useState } from 'react';
import Sidebar from './Shared/Sidebar/Sidebar';
import './Shared/style/app.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchBar from './Shared/SearchBar/SearchBar';
import { useEffect } from 'react';
import useAuth from './Features/Authentication/Hooks/useAuth';



const App = () => {
  const [active, setActive] = useState('dashboard');

  const { protectedHandler } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {

    async function checkAuth() {
      const isAuth = await protectedHandler();

      if (!isAuth) {
        // navigate('/');
      }
    }

    checkAuth();


  }, [])


  return (
    <div className="app">

      <Sidebar activeScreen={active} onNavigate={setActive} />

      <SearchBar />

      <Outlet />

    </div>

  );
};

export default App;