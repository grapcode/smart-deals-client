import { Navigate, useLocation } from 'react-router';

import MyLoading from '../../My/MyLoading';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // 📍 current location thek onno jagay pathate
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <MyLoading></MyLoading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
