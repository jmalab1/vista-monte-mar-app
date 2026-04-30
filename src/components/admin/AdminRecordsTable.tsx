import React from 'react';
import AdminSurfaceCard from './AdminSurfaceCard';
import AdminDataTable, { AdminDataTableProps } from './AdminDataTable';

type Pagination = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

type RowsControl = {
  value: number;
  options: number[];
  onChange: (next: number) => void;
};

type ExportControl = {
  onExport: () => void | Promise<void>;
  label?: string;
};

type Props<T> = {
  title: string;
  subtitle?: string;
  filters?: React.ReactNode;
  metadata?: React.ReactNode;
  rowsControl?: RowsControl;
  exportControl?: ExportControl;
  summary?: React.ReactNode;
  emptyMessage?: string;
  pagination?: Pagination;
  table: AdminDataTableProps<T>;
};

function AdminRecordsTable<T>({
  title,
  subtitle,
  filters,
  metadata,
  rowsControl,
  exportControl,
  summary,
  emptyMessage = 'No records found.',
  pagination,
  table,
}: Props<T>) {
  return (
    <AdminSurfaceCard title={title} subtitle={subtitle}>
      {(rowsControl || exportControl) && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {rowsControl && (
            <>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300" htmlFor="records-page-size">
                Rows
              </label>
              <select
                id="records-page-size"
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                value={rowsControl.value}
                onChange={(event) => rowsControl.onChange(Number(event.target.value))}
              >
                {rowsControl.options.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </>
          )}
          {exportControl && (
            <button
              type="button"
              className="rounded-md border border-blue-700 bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white dark:border-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
              onClick={exportControl.onExport}
            >
              {exportControl.label || 'Export CSV'}
            </button>
          )}
        </div>
      )}
      {filters && <div className="mb-4">{filters}</div>}
      {metadata && <div className="mb-4">{metadata}</div>}

      {table.rows.length === 0 && !table.loading && (
        <p className="text-sm text-slate-600 dark:text-slate-300">{emptyMessage}</p>
      )}

      {table.rows.length > 0 && (
        <>
          <AdminDataTable {...table} />
          {(summary || pagination) && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">{summary}</div>
              {pagination && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    onClick={pagination.onPrev}
                    disabled={pagination.prevDisabled}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    onClick={pagination.onNext}
                    disabled={pagination.nextDisabled}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </AdminSurfaceCard>
  );
}

export default AdminRecordsTable;
