import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const ProtectedRoute = ({ element }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? element : <Navigate to='/Login' replace />;
};

export default ProtectedRoute;
