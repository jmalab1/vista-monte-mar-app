import { ReactNode } from 'react';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type Props = {
  label: string;
  value: ReactNode;
  tone?: Tone;
};

const toneClasses: Record<Tone, string> = {
  neutral: 'border-slate-200 bg-slate-100 text-slate-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-rose-200 bg-rose-50 text-rose-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
};

const AdminStatPill = ({ label, value, tone = 'neutral' }: Props) => {
  return (
    <div
      className={[
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold',
        toneClasses[tone],
      ].join(' ')}
    >
      <span className="uppercase tracking-[0.12em]">{label}</span>
      <span className="text-sm font-bold normal-case tracking-normal">{value}</span>
    </div>
  );
};

export default AdminStatPill;
