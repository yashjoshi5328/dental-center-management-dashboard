import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage, isAdmin, isPatient } from './auth';

export const RootRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = getUserFromLocalStorage();
    if (isAdmin(user)) navigate('/admin', { replace: true });
    else if (isPatient(user)) navigate('/patient', { replace: true });
    else navigate('/login', { replace: true });
  }, [navigate]);
  return null;
};

export const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!isAdmin(user)) navigate('/login', { replace: true });
  }, [navigate]);
  return <>{children}</>;
};

export const RequirePatient = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!isPatient(user)) navigate('/login', { replace: true });
  }, [navigate]);
  return <>{children}</>;
};
