import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminPreferences, HistoryPeriod } from '../../context/AdminPreferencesContext';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';
import AdminRecordsTable from '../../components/admin/AdminRecordsTable';

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
  period: HistoryPeriod;
};

const PERIOD_LABELS: Record<HistoryPeriod, string> = {
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
  const { preferences, savePreferences } = useAdminPreferences();
  const isDarkMode = Boolean(preferences.darkMode);

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [period, setPeriod] = useState<HistoryPeriod>('day');
  const [pathInput, setPathInput] = useState('');
  const [referrerInput, setReferrerInput] = useState('');
  const [ipInput, setIpInput] = useState('');
  const [uaInput, setUaInput] = useState('');
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [pathFilter, setPathFilter] = useState('');
  const [referrerFilter, setReferrerFilter] = useState('');
  const [ipFilter, setIpFilter] = useState('');
  const [uaFilter, setUaFilter] = useState('');
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setPageSize(preferences.historyPageSize || 10);
    setPeriod(preferences.historyPeriod || 'day');
  }, [isAuthenticated, preferences.historyPageSize, preferences.historyPeriod]);

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
          path: pathFilter || undefined,
          referrer: referrerFilter || undefined,
          ip: ipFilter || undefined,
          uaContains: uaFilter || undefined,
          from: fromFilter || undefined,
          to: toFilter || undefined,
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
  }, [isAuthenticated, page, pageSize, period, pathFilter, referrerFilter, ipFilter, uaFilter, fromFilter, toFilter, showToast]);

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/visitor-history/export.csv', {
        params: {
          path: pathFilter || undefined,
          referrer: referrerFilter || undefined,
          ip: ipFilter || undefined,
          uaContains: uaFilter || undefined,
          from: fromFilter || undefined,
          to: toFilter || undefined,
        },
        responseType: 'blob',
      });
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'visitor-history.csv';
      link.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      showToast('Unable to export CSV.', 'error');
    }
  };

  const handleApplyFilters = () => {
    setPage(1);
    setPathFilter(pathInput.trim());
    setReferrerFilter(referrerInput.trim());
    setIpFilter(ipInput.trim());
    setUaFilter(uaInput.trim());
    setFromFilter(fromInput);
    setToFilter(toInput);
  };

  const handleClearFilters = () => {
    setPage(1);
    setPathInput('');
    setReferrerInput('');
    setIpInput('');
    setUaInput('');
    setFromInput('');
    setToInput('');
    setPathFilter('');
    setReferrerFilter('');
    setIpFilter('');
    setUaFilter('');
    setFromFilter('');
    setToFilter('');
  };

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

  const visibleRecords = useMemo(() => records.slice(0, pageSize), [records, pageSize]);
  const pageStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const pageEnd = total === 0 ? 0 : Math.min(pageStart + visibleRecords.length - 1, total);
  const axisColor = isDarkMode ? '#94a3b8' : '#64748b';
  const gridColor = isDarkMode ? '#334155' : '#cbd5e1';
  const tickColor = isDarkMode ? '#e2e8f0' : '#475569';
  const pointStrokeColor = isDarkMode ? '#0f172a' : '#ffffff';
  const maxSeriesCount = Math.max(...series.map((item) => item.count), 1);

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
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(PERIOD_LABELS) as HistoryPeriod[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPeriod(option);
                    setPage(1);
                    void savePreferences({ historyPeriod: option });
                  }}
                  className={[
                    'rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-blue-300',
                    period === option
                      ? 'border-blue-700 bg-blue-700 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
                  ].join(' ')}
                >
                  {PERIOD_LABELS[option]}
                </button>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <AdminStatPill label="Total Records" value={total} tone="info" />
              <AdminStatPill label="Page" value={`${page}/${totalPages}`} />
              <AdminStatPill label="State" value={loading ? 'Loading' : 'Ready'} tone={loading ? 'warning' : 'success'} />
              <AdminStatPill label="Period" value={PERIOD_LABELS[period]} tone="warning" />
            </div>

            <AdminSurfaceCard
              title="Traffic Trend"
              subtitle={`Line graph grouped by ${PERIOD_LABELS[period].toLowerCase()} over entire history.`}
            >
              {series.length === 0 && !loading && <p className="text-sm text-slate-600 dark:text-slate-300">No trend data found.</p>}
              {series.length > 0 && (
                <div className={['overflow-x-auto pb-2 transition-opacity', loading ? 'opacity-80' : 'opacity-100'].join(' ')}>
                  <div className="min-w-[760px] rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                    <svg viewBox="0 0 780 240" className="h-64 w-full">
                      {[0, 1, 2, 3, 4].map((tick) => {
                        const y = 20 + tick * 50;
                        const value = Math.round(maxSeriesCount * (1 - tick / 4));
                        return (
                          <g key={`y-tick-${tick}`}>
                            <line x1="24" y1={y} x2="756" y2={y} stroke={gridColor} strokeWidth="1" />
                            <text x="18" y={y + 4} textAnchor="end" style={{ fill: tickColor, fontSize: 10, fontWeight: 600 }}>
                              {value}
                            </text>
                          </g>
                        );
                      })}
                      <line x1="24" y1="220" x2="756" y2="220" stroke={axisColor} strokeWidth="1.25" />
                      <polyline
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={chartPoints}
                      />
                      {series.map((point, index) => {
                        const x =
                          series.length === 1
                            ? 390
                            : 24 + (index / (series.length - 1)) * (780 - 48);
                        const y = 20 + (200 - (point.count / maxSeriesCount) * 200);
                        return (
                          <g key={`${point.bucket}-${index}`}>
                            <circle cx={x} cy={y} r={5} fill="#3b82f6" stroke={pointStrokeColor} strokeWidth="2" />
                            <text x={x} y="236" textAnchor="middle" style={{ fill: tickColor, fontSize: 10, fontWeight: 600 }}>
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

            <AdminRecordsTable
              title="Events"
              subtitle="Paginated results. Use page controls to view complete history."
              rowsControl={{
                value: pageSize,
                options: [10, 25, 50, 100],
                onChange: (nextSize) => {
                  setPageSize(nextSize);
                  setPage(1);
                  void savePreferences({ historyPageSize: nextSize });
                },
              }}
              exportControl={{
                onExport: handleExport,
                label: 'Export CSV',
              }}
              filters={(
                <div className="space-y-3">
                  <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
                    <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Path" value={pathInput} onChange={(e) => setPathInput(e.target.value)} />
                    <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Referrer" value={referrerInput} onChange={(e) => setReferrerInput(e.target.value)} />
                    <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="IP" value={ipInput} onChange={(e) => setIpInput(e.target.value)} />
                    <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="User agent contains" value={uaInput} onChange={(e) => setUaInput(e.target.value)} />
                    <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" type="date" value={fromInput} onChange={(e) => setFromInput(e.target.value)} />
                    <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" type="date" value={toInput} onChange={(e) => setToInput(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-blue-700 bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white dark:border-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                      onClick={handleApplyFilters}
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                      onClick={handleClearFilters}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
              emptyMessage="No events found."
              summary={<span>Showing {pageStart}-{pageEnd} of {total}</span>}
              pagination={{
                page,
                totalPages,
                onPrev: () => setPage((prev) => Math.max(prev - 1, 1)),
                onNext: () => setPage((prev) => Math.min(prev + 1, totalPages)),
                prevDisabled: page <= 1,
                nextDisabled: page >= totalPages,
              }}
              table={{
                rows: visibleRecords,
                loading,
                minWidthClassName: 'min-w-[960px]',
                rowKey: (row, index) => `${row.createdAt}-${row.ip || 'na'}-${index}`,
                columns: [
                  {
                    key: 'time',
                    header: 'Time',
                    cellClassName: 'whitespace-nowrap font-medium text-slate-800 dark:text-slate-100',
                    render: (row) => formatTime(row.createdAt),
                  },
                  {
                    key: 'path',
                    header: 'Path',
                    render: (row) => (
                      <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {row.path || 'N/A'}
                      </span>
                    ),
                  },
                  {
                    key: 'referrer',
                    header: 'Referrer',
                    cellClassName: 'text-slate-600 dark:text-slate-300',
                    render: (row) => row.referrer || 'N/A',
                  },
                  {
                    key: 'ip',
                    header: 'IP',
                    cellClassName: 'whitespace-nowrap font-mono text-xs text-slate-600 dark:text-slate-300',
                    render: (row) => row.ip || 'N/A',
                  },
                  {
                    key: 'userAgent',
                    header: 'User Agent',
                    render: (row) => (
                      <p className="line-clamp-2 max-w-[420px] break-all text-xs text-slate-600 dark:text-slate-300">
                        {row.userAgent || 'N/A'}
                      </p>
                    ),
                  },
                ],
              }}
            />
          </div>
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default History;
