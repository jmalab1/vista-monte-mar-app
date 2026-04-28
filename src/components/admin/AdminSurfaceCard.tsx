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
        'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6',
        className,
      ].join(' ')}
    >
      {(title || subtitle || actions) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
};

export default AdminSurfaceCard;
