type Props = {
  loading: boolean;
  label: string;
};

const AuthSubmitButton = ({ loading, label }: Props) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Signing in...' : label}
    </button>
  );
};

export default AuthSubmitButton;
