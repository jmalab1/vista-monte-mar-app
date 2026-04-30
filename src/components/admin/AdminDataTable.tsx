import React from 'react';

export type AdminTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  cellClassName?: string;
  render: (row: T, index: number) => React.ReactNode;
};

export type AdminDataTableProps<T> = {
  rows: T[];
  columns: AdminTableColumn<T>[];
  rowKey: (row: T, index: number) => string;
  loading?: boolean;
  minWidthClassName?: string;
};

function AdminDataTable<T>({
  rows,
  columns,
  rowKey,
  loading = false,
  minWidthClassName = 'min-w-[960px]',
}: AdminDataTableProps<T>) {
  return (
    <div
      className={[
        'overflow-x-auto rounded-xl border border-slate-200 bg-white transition-opacity dark:border-slate-700 dark:bg-slate-900',
        loading ? 'opacity-80' : 'opacity-100',
      ].join(' ')}
    >
      <table className={`w-full ${minWidthClassName} text-left`}>
        <thead className="bg-slate-50 dark:bg-slate-800/70">
          <tr className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">
            {columns.map((column) => (
              <th key={column.key} className={`px-4 py-3 font-bold ${column.className || ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={rowKey(row, index)}
              className={[
                'border-t border-slate-100 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200',
                index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/70 dark:bg-slate-800/40',
              ].join(' ')}
            >
              {columns.map((column) => (
                <td
                  key={`${column.key}-${index}`}
                  className={`px-4 py-3 align-top ${column.cellClassName || ''}`}
                >
                  {column.render(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDataTable;
