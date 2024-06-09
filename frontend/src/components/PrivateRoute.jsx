// src/components/PrivateRoute.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate=useNavigate()
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          navigate('/')
        )
      }
    />
  );
};

export default PrivateRoute;
