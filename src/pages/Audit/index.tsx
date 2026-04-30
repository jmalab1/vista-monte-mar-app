import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utility/axiosInstance';
import { useToast } from '../../context/ToastContext';
import type { AxiosError } from 'axios';

type AuditRecord = {
  actor: string;
  action: string;
  target: string | null;
  metadata: Record<string, unknown>;
  ip: string | null;
  createdAt: string;
};

const Audit = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionInput, setActionInput] = useState('');
  const [actorInput, setActorInput] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [actorFilter, setActorFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);

    const loadAuditEvents = async () => {
      const baseFilters: Record<string, string> = {};
      if (actionFilter) {
        baseFilters.action = actionFilter;
      }
      if (actorFilter) {
        baseFilters.actor = actorFilter;
      }

      const attempts: Array<Record<string, string | number>> = [
        { page, pageSize: 25, ...baseFilters },
        { page, limit: 25, ...baseFilters },
        baseFilters,
      ];

      let lastError: unknown = null;

      for (const params of attempts) {
        try {
          const response = await axios.get('/api/audit-events', { params });
          setRecords(response.data.records || []);
          setTotalPages(Math.max(response.data.totalPages || 1, 1));
          setTotal(response.data.total || 0);
          return;
        } catch (error) {
          lastError = error;
        }
      }

      const errorMessage =
        (lastError as AxiosError<{ error?: string }>)?.response?.data?.error ||
        'Unable to load audit events.';
      showToast(errorMessage, 'error');
    };

    loadAuditEvents().finally(() => {
      setLoading(false);
    });
  }, [isAuthenticated, page, actionFilter, actorFilter, showToast]);

  const handleApply = () => {
    setPage(1);
    setActionFilter(actionInput.trim());
    setActorFilter(actorInput.trim());
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <AdminDashboardLayout activeNavKey="audit">
      <AdminTopbar title="Audit Log" subtitle="Who changed what and when." />

      <div className="flex flex-wrap items-center gap-2">
        <AdminStatPill label="Records" value={total} tone="info" />
        <AdminStatPill label="Page" value={`${page}/${totalPages}`} />
        <AdminStatPill label="State" value={loading ? 'Loading' : 'Ready'} tone={loading ? 'warning' : 'success'} />
      </div>

      <AdminSurfaceCard title="Filters" subtitle="Filter by actor or action.">
        <div className="grid gap-3 md:grid-cols-3">
          <input className="rounded border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Action" value={actionInput} onChange={(e) => setActionInput(e.target.value)} />
          <input className="rounded border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Actor" value={actorInput} onChange={(e) => setActorInput(e.target.value)} />
          <button
            type="button"
            onClick={handleApply}
            className="rounded border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold text-white dark:border-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </AdminSurfaceCard>

      <AdminSurfaceCard title="Events" subtitle="Latest first.">
        <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-700">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Actor</th>
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Target</th>
                <th className="px-3 py-2">IP</th>
                <th className="px-3 py-2">Metadata</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, idx) => (
                <tr key={`${row.createdAt}-${idx}`} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{new Date(row.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{row.actor}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{row.action}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{row.target || 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{row.ip || 'N/A'}</td>
                  <td className="px-3 py-2">
                    <code className="text-xs text-slate-700 dark:text-slate-200">{JSON.stringify(row.metadata || {})}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            className="rounded border border-slate-300 bg-white px-3 py-1 text-xs font-semibold dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-slate-300 bg-white px-3 py-1 text-xs font-semibold dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </AdminSurfaceCard>
    </AdminDashboardLayout>
  );
};

export default Audit;
