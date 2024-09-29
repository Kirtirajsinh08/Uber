import './App.css';
import './index.css'; // or './App.css'

import RiderPage from './components/RiderPage';
import LandingPage from './components/LandingPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DriverPage from './components/DriverPage';
import { useState, useEffect } from 'react';
import { authenticatedContext, locationContext } from './components/context'; // Import locationContext
import DriverDashboard from './components/DriverDashboard';
import { Toaster } from 'react-hot-toast';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const getUserStatus = async () => {
    const res = await fetch('http://localhost:8000/');
    const result = await res.json();
    setAuthenticated(result.authenticated);
    console.log(result.authenticated);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);
    });
  };

  useEffect(() => {
    getUserStatus();
    getUserLocation(); 

  }, []);

  const router = createBrowserRouter([ 
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/bookride",
      element: <RiderPage />,
    },
    {
      path: "/driverdashboard",
      element: <DriverDashboard />,
    }
  ]);

  return (
    <authenticatedContext.Provider value={{ authenticated, setAuthenticated }}>
      <locationContext.Provider value={{ lon, lat }}>
        <div>
          <Toaster/>
          <RouterProvider router={router} />
        </div>
      </locationContext.Provider>
    </authenticatedContext.Provider>
  );
}

export default App;
