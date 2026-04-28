import AuthBusinessLayout from '../../layouts/AuthBusinessLayout';

const ForgotPassword = () => {
  return (
    <AuthBusinessLayout
      title="Reset access"
      subtitle="Enter your account email and we will send reset instructions."
      panelTitle="Credential Recovery"
      panelBullets={[
        'Recovery links are time-limited for security.',
        'Use your authorized operations account email.',
      ]}
    >
      <p className="text-sm text-slate-600">Coming soon: forgot-password flow.</p>
    </AuthBusinessLayout>
  );
};

export default ForgotPassword;
