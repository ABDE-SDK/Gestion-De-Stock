import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

export default function ProtectedRoutes() {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAllowed(false);
      setChecking(false);
      return;
    }

    axiosInstance
      .get('/protected')
      .then(() => {
        setAllowed(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setAllowed(false);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  if (checking) {
    return null;
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
