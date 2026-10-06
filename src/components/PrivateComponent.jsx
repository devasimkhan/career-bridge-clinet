import React from 'react';
import { useSelector } from 'react-redux';
import useAuthStatus from '../hooks/useAuthStatus';
import useOnlineUsers from '../hooks/useOnlineUsers';
import LoadingScreen from './LoadingScreen';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const { checkingUser, isAuthenticated } = useAuthStatus();

  // Maintain global realtime online presence socket whenever user is logged in
  useOnlineUsers(user?.token);

  if (checkingUser) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateComponent;