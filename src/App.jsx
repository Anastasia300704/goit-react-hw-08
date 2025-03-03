import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { refreshUser } from './redux/auth/operations';
import  Layout  from './components/Layout/Layout';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import  LoginPage  from './pages/LoginPage/LoginPage';
import  RegistrationPage  from './pages/RegistrationPage/RegistrationPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import  HomePage  from './pages/HomePage/HomePage';
import { selectIsRefreshing } from './redux/auth/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    isRefreshing ? (
     <div>Loading...</div>
    ) : (
      <Layout>
        <Routes>
          <Route path="/login" element={<RestrictedRoute component={LoginPage} />} />
          <Route path="/register" element={<RestrictedRoute component={RegistrationPage} />} />
          <Route path="/contacts" element={<PrivateRoute component={ContactsPage} />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    )
  );
};

export default App;