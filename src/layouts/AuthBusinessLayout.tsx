import { ReactNode } from 'react';
import AuthPanel from '../components/auth/AuthPanel';
import AuthFormCard from '../components/auth/AuthFormCard';

type Props = {
  title: string;
  subtitle: string;
  panelTitle: string;
  panelBullets: string[];
  children: ReactNode;
};

const AuthBusinessLayout = ({
  title,
  subtitle,
  panelTitle,
  panelBullets,
  children,
}: Props) => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <AuthPanel title={panelTitle} bullets={panelBullets} />
        <AuthFormCard title={title} subtitle={subtitle}>
          {children}
        </AuthFormCard>
      </div>
    </div>
  );
};

export default AuthBusinessLayout;
