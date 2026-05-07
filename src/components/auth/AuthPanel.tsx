type Props = {
  title: string;
  bullets: string[];
};

const AuthPanel = ({ title, bullets }: Props) => {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Admin Access
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">{title}</h2>
      <ul className="mt-6 space-y-3 text-sm text-slate-600">
        {bullets.map((item) => (
          <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AuthPanel;
