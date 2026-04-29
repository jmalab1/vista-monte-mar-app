import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../../components/Authentication';
import { useAuth } from '../../context/AuthContext';
import AuthBusinessLayout from '../../layouts/AuthBusinessLayout';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleOpenGuestSite = () => {
    window.open('/vista_monte_mar/', '_blank', 'noopener,noreferrer');
  };

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
      <div className="space-y-4">
        <AuthComponent />
        <button
          type="button"
          onClick={handleOpenGuestSite}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Open Guest Website
        </button>
      </div>
    </AuthBusinessLayout>
  );
};

export default Login;
