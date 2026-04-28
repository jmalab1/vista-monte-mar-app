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
      title="Sign in to Admin Console"
      subtitle="Access operations, checklist workflows, and traffic insights."
      panelTitle="Property Operations Portal"
      panelBullets={[
        'Manage inventory and checklist updates with audit visibility.',
        'Review traffic history and operational activity in one place.',
        'Secure access with token-based session verification.',
      ]}
    >
      <AuthComponent />
    </AuthBusinessLayout>
  );
};

export default Login;
