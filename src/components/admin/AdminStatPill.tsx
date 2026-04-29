import { ReactNode } from 'react';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type Props = {
  label: string;
  value: ReactNode;
  tone?: Tone;
};

const toneClasses: Record<Tone, string> = {
  neutral: 'border-slate-300 bg-white text-slate-800',
  success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  warning: 'border-slate-300 bg-slate-50 text-slate-900',
  danger: 'border-rose-300 bg-rose-50 text-rose-900',
  info: 'border-blue-300 bg-blue-50 text-blue-900',
};

const AdminStatPill = ({ label, value, tone = 'neutral' }: Props) => {
  return (
    <div
      className={[
        'inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-sm',
        toneClasses[tone],
      ].join(' ')}
    >
      <span className="uppercase tracking-[0.12em]">{label}</span>
      <span className="text-sm font-bold normal-case tracking-normal">{value}</span>
    </div>
  );
};

export default AdminStatPill;
