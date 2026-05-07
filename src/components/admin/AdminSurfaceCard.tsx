import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

const AdminSurfaceCard = ({ children, title, subtitle, actions, className = '' }: Props) => {
  return (
    <section
      className={[
        'rounded-lg border border-slate-300 bg-white p-5 shadow-none dark:border-slate-700 dark:bg-slate-800 sm:p-6',
        className,
      ].join(' ')}
    >
      {(title || subtitle || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-300 pb-4 dark:border-slate-700">
          <div>
            {title && <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
};

export default AdminSurfaceCard;
