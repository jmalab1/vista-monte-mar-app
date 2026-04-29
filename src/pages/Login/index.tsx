import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../../components/Authentication';
import { useAuth } from '../../context/AuthContext';
import AuthBusinessLayout from '../../layouts/AuthBusinessLayout';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/manage_inventory');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthBusinessLayout
      title="Sign in to Operations Dashboard"
      subtitle="Monitor daily traffic, manage workflows, and maintain property readiness from one control center."
      panelTitle="Vista Monte Mar Operations"
      panelBullets={[
        'Track visitor traffic trends by day, month, and year.',
        'Coordinate inventory and checklist execution with clear accountability.',
        'Use secure authenticated sessions for authorized team access.',
      ]}
    >
      <AuthComponent />
    </AuthBusinessLayout>
  );
};

export default Login;
