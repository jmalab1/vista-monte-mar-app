import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';

type HistoryRow = Record<string, unknown>;

const getFirstString = (row: HistoryRow, keys: string[]): string => {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return '';
};

const getHistoryTime = (row: HistoryRow): string => {
  const raw = getFirstString(row, ['createdAt', 'created_at', 'timestamp', 'date']);

  if (!raw) {
    return 'N/A';
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return raw;
  }

  return parsed.toLocaleString();
};

const normalizeRows = (raw: unknown): HistoryRow[] => {
  if (Array.isArray(raw)) {
    return raw.filter((entry): entry is HistoryRow => Boolean(entry) && typeof entry === 'object');
  }

  if (raw && typeof raw === 'object') {
    const maybeRecords = (raw as { records?: unknown }).records;
    if (Array.isArray(maybeRecords)) {
      return maybeRecords.filter(
        (entry): entry is HistoryRow => Boolean(entry) && typeof entry === 'object'
      );
    }
  }

  return [];
};

type TrafficTableRow = {
  time: string;
  path: string;
  referrer: string;
  ip: string;
  userAgent: string;
};

const History = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    axios
      .get('/api/visitor-history')
      .then((response) => {
        setRows(normalizeRows(response.data));
      })
      .catch(() => {
        showToast('Oh no! Unable to load traffic history.', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated, showToast]);

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aRaw = getFirstString(a, ['createdAt', 'created_at', 'timestamp', 'date']);
      const bRaw = getFirstString(b, ['createdAt', 'created_at', 'timestamp', 'date']);
      const aTime = new Date(aRaw).getTime();
      const bTime = new Date(bRaw).getTime();

      if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
        return bTime - aTime;
      }

      return 0;
    });
  }, [rows]);

  const tableData = useMemo<TrafficTableRow[]>(
    () =>
      sortedRows.map((row) => ({
        time: getHistoryTime(row),
        path: getFirstString(row, ['path', 'route']) || 'N/A',
        referrer: getFirstString(row, ['referrer']) || 'N/A',
        ip: getFirstString(row, ['ip', 'ipAddress']) || 'N/A',
        userAgent: getFirstString(row, ['userAgent', 'user_agent', 'ua']) || 'N/A',
      })),
    [sortedRows]
  );

  const columns = useMemo<ColumnDef<TrafficTableRow>[]>(
    () => [
      {
        accessorKey: 'time',
        header: 'Time',
        cell: ({ getValue }) => (
          <span className="whitespace-nowrap font-medium text-slate-800">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: 'path',
        header: 'Path',
        cell: ({ getValue }) => (
          <span className="rounded-md bg-[#f7f2ed] px-2 py-1 font-mono text-xs text-[#6f4b34]">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: 'referrer',
        header: 'Referrer',
        cell: ({ getValue }) => <span className="text-slate-600">{String(getValue())}</span>,
      },
      {
        accessorKey: 'ip',
        header: 'IP',
        cell: ({ getValue }) => (
          <span className="whitespace-nowrap font-mono text-xs text-slate-600">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: 'userAgent',
        header: 'User Agent',
        cell: ({ getValue }) => (
          <p className="line-clamp-2 max-w-[380px] break-all text-xs text-slate-600">
            {String(getValue())}
          </p>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageStart = pagination.pageIndex * pagination.pageSize + 1;
  const pageEnd = Math.min((pagination.pageIndex + 1) * pagination.pageSize, tableData.length);

  return (
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <AdminDashboardLayout activeNavKey="history">
          <AdminTopbar
            title="Traffic History"
            subtitle="Review visitor traffic events and paginate through recent records."
          />

          <div className="flex flex-wrap items-center gap-2">
            <AdminStatPill label="Records" value={sortedRows.length} tone="info" />
            <AdminStatPill
              label="Page"
              value={`${table.getState().pagination.pageIndex + 1}/${Math.max(table.getPageCount(), 1)}`}
            />
          </div>

          <AdminSurfaceCard title="Recent Activity" subtitle="Traffic requests captured from visitors.">
            {loading && <p className="text-sm text-slate-600">Loading traffic history...</p>}
            {!loading && sortedRows.length === 0 && (
              <p className="text-sm text-slate-600">No traffic history found.</p>
            )}
            {!loading && sortedRows.length > 0 && (
              <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-medium text-slate-600">
                    Showing {pageStart}-{pageEnd} of {tableData.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-600" htmlFor="page-size">
                      Rows
                    </label>
                    <select
                      id="page-size"
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                      value={pagination.pageSize}
                      onChange={(event) => {
                        table.setPageSize(Number(event.target.value));
                      }}
                    >
                      {[10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full min-w-[900px] text-left">
                    <thead className="bg-slate-50">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="text-xs uppercase tracking-wide text-slate-600">
                          {headerGroup.headers.map((header) => (
                            <th key={header.id} className="px-4 py-3 font-bold">
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className="border-t border-slate-100 text-sm text-slate-700 odd:bg-white even:bg-slate-50/40"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-3 align-top">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-600">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </AdminSurfaceCard>
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default History;
