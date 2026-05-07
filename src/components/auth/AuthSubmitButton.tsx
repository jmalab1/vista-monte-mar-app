type Props = {
  loading: boolean;
  label: string;
};

const AuthSubmitButton = ({ loading, label }: Props) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center rounded-lg border border-blue-700 bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Signing in...' : label}
    </button>
  );
};

export default AuthSubmitButton;
