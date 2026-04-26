import { useNavigate } from 'react-router-dom';
import AuthComponent from '../../components/Authentication';
import { useAuth } from '../../context/AuthContext';
import Container from '../../components/Container';
import React from 'react';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/manage_inventory');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container classValue="bg-base-200 lg:px-8 min-h-screen">
      {!isAuthenticated && <AuthComponent />}
    </Container>
  );
};

export default Login;
