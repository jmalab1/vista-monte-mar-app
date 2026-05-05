import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import AuthField from '../auth/AuthField';
import AuthSubmitButton from '../auth/AuthSubmitButton';

const AuthComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(username, password);
      showToast('Login successful.', 'success');
    } catch {
      showToast('Login failed. Please check your credentials and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <AuthField
        id="username"
        name="username"
        type="text"
        label="Username"
        required
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isSubmitting}
      />

      <AuthField
        id="password"
        name="password"
        type="password"
        label="Password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isSubmitting}
      />

      <AuthSubmitButton loading={isSubmitting} label="Sign in" />
    </form>
  );
};

export default AuthComponent;
