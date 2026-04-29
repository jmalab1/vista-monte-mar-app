import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';

type Period = 'day' | 'month' | 'year';

type HistoryRecord = {
  createdAt: string;
  path: string;
  referrer: string | null;
  userAgent: string | null;
  ip: string | null;
};

type SeriesPoint = {
  bucket: string;
  count: number;
};

type VisitorHistoryResponse = {
  records: HistoryRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  series: SeriesPoint[];
  period: Period;
};

const PERIOD_LABELS: Record<Period, string> = {
  day: 'Day',
  month: 'Month',
  year: 'Year',
};

const formatTime = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString();
};

const History = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [period, setPeriod] = useState<Period>('day');

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    axios
      .get<VisitorHistoryResponse>('/api/visitor-history', {
        params: {
          page,
          pageSize,
          period,
        },
      })
      .then((response) => {
        setRecords(response.data.records || []);
        setSeries(response.data.series || []);
        setTotal(response.data.total || 0);
        setTotalPages(Math.max(response.data.totalPages || 1, 1));
      })
      .catch(() => {
        showToast('Oh no! Unable to load traffic history.', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated, page, pageSize, period, showToast]);

  const chartPoints = useMemo(() => {
    if (!series.length) return '';
    const width = 780;
    const height = 240;
    const padX = 24;
    const padY = 20;
    const innerWidth = width - padX * 2;
    const innerHeight = height - padY * 2;
    const maxCount = Math.max(...series.map((point) => point.count), 1);

    return series
      .map((point, index) => {
        const x =
          series.length === 1
            ? width / 2
            : padX + (index / (series.length - 1)) * innerWidth;
        const y = padY + innerHeight - (point.count / maxCount) * innerHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }, [series]);

  const pageStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const pageEnd = Math.min(page * pageSize, total);

  return (
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <AdminDashboardLayout activeNavKey="history">
          <AdminTopbar
            title="Traffic History"
            subtitle="Paginated visitor history with line trends by day, month, or year."
          />

          <div className="space-y-5 border-t border-slate-300 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(PERIOD_LABELS) as Period[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setPeriod(option);
                      setPage(1);
                    }}
                    className={[
                      'rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-blue-300',
                      period === option
                        ? 'border-blue-700 bg-blue-700 text-white shadow-sm'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100',
                    ].join(' ')}
                  >
                    {PERIOD_LABELS[option]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-600" htmlFor="page-size">
                  Rows
                </label>
                <select
                  id="page-size"
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <AdminStatPill label="Total Records" value={total} tone="info" />
              <AdminStatPill label="Page" value={`${page}/${totalPages}`} />
              <AdminStatPill label="Showing" value={`${pageStart}-${pageEnd}`} tone="success" />
              <AdminStatPill label="Period" value={PERIOD_LABELS[period]} tone="warning" />
            </div>

            <AdminSurfaceCard
              title="Traffic Trend"
              subtitle={`Line graph grouped by ${PERIOD_LABELS[period].toLowerCase()} over entire history.`}
            >
              {loading && records.length > 0 && (
                <p className="mb-3 text-xs font-medium text-slate-500">Updating chart...</p>
              )}
              {series.length === 0 && !loading && <p className="text-sm text-slate-600">No trend data found.</p>}
              {series.length > 0 && (
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-[760px] rounded-lg border border-slate-300 bg-white p-4">
                    <svg viewBox="0 0 780 240" className="h-64 w-full">
                      <line x1="24" y1="220" x2="756" y2="220" stroke="#94a3b8" strokeWidth="1" />
                      <polyline
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={chartPoints}
                      />
                      {series.map((point, index) => {
                        const maxCount = Math.max(...series.map((item) => item.count), 1);
                        const x =
                          series.length === 1
                            ? 390
                            : 24 + (index / (series.length - 1)) * (780 - 48);
                        const y = 20 + (200 - (point.count / maxCount) * 200);
                        return (
                          <g key={`${point.bucket}-${index}`}>
                            <circle cx={x} cy={y} r={5} fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                            <text x={x} y="236" textAnchor="middle" className="fill-slate-600 text-[10px] font-medium">
                              {point.bucket}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}
            </AdminSurfaceCard>

            <AdminSurfaceCard title="Events" subtitle="Paginated results. Use page controls to view complete history.">
              {loading && records.length > 0 && (
                <p className="mb-3 text-xs font-medium text-slate-500">Loading next page...</p>
              )}
              {records.length === 0 && !loading && <p className="text-sm text-slate-600">No events found.</p>}
              {records.length > 0 && (
                <>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full min-w-[960px] text-left">
                      <thead className="bg-slate-50">
                        <tr className="text-xs uppercase tracking-wide text-slate-600">
                          <th className="px-4 py-3 font-bold">Time</th>
                          <th className="px-4 py-3 font-bold">Path</th>
                          <th className="px-4 py-3 font-bold">Referrer</th>
                          <th className="px-4 py-3 font-bold">IP</th>
                          <th className="px-4 py-3 font-bold">User Agent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((row, index) => (
                          <tr
                            key={`${row.createdAt}-${row.ip || 'na'}-${index}`}
                            className="border-t border-slate-100 text-sm text-slate-700 odd:bg-white even:bg-slate-50/40"
                          >
                            <td className="whitespace-nowrap px-4 py-3 align-top font-medium text-slate-800">
                              {formatTime(row.createdAt)}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                                {row.path || 'N/A'}
                              </span>
                            </td>
                            <td className="px-4 py-3 align-top text-slate-600">{row.referrer || 'N/A'}</td>
                            <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-xs text-slate-600">
                              {row.ip || 'N/A'}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <p className="line-clamp-2 max-w-[420px] break-all text-xs text-slate-600">
                                {row.userAgent || 'N/A'}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-slate-600">
                      Showing {pageStart}-{pageEnd} of {total}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page <= 1}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page >= totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </AdminSurfaceCard>
          </div>
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default History;
