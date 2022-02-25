import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AccountLayout from '../layouts/AccountLayout';

export default function ProtectedRoutes() {
  // Bindings
  const auth = useContext(AuthContext);
  const token = localStorage.getItem('token');

  // Update auth context state if no token in local storage
  if (!token) {
    auth.setToken('');
  }

  return auth.token && token ? (
    <AccountLayout>
      <Outlet />
    </AccountLayout>
  ) : (
    <Navigate to="/login" />
  );
}
