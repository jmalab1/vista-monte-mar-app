import { ReactNode } from 'react';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type Props = {
  label: string;
  value: ReactNode;
  tone?: Tone;
};

const toneClasses: Record<Tone, string> = {
  neutral: 'border-slate-300 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
  success: 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
  warning: 'border-slate-300 bg-slate-50 text-slate-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200',
  danger: 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-rose-200',
  info: 'border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-200',
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
