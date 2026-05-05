import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminRecordsTable from '../../components/admin/AdminRecordsTable';
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
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionInput, setActionInput] = useState('');
  const [actorInput, setActorInput] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [ipInput, setIpInput] = useState('');
  const [metadataInput, setMetadataInput] = useState('');
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [actorFilter, setActorFilter] = useState('');
  const [targetFilter, setTargetFilter] = useState('');
  const [ipFilter, setIpFilter] = useState('');
  const [metadataFilter, setMetadataFilter] = useState('');
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');

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
      if (targetFilter) {
        baseFilters.target = targetFilter;
      }
      if (ipFilter) {
        baseFilters.ip = ipFilter;
      }
      if (metadataFilter) {
        baseFilters.metadataContains = metadataFilter;
      }
      if (fromFilter) {
        baseFilters.from = fromFilter;
      }
      if (toFilter) {
        baseFilters.to = toFilter;
      }

      const attempts: Array<Record<string, string | number>> = [
        { page, pageSize, ...baseFilters },
        { page, limit: pageSize, ...baseFilters },
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
  }, [isAuthenticated, page, pageSize, actionFilter, actorFilter, targetFilter, ipFilter, metadataFilter, fromFilter, toFilter, showToast]);

  const handleApply = () => {
    setPage(1);
    setActionFilter(actionInput.trim());
    setActorFilter(actorInput.trim());
    setTargetFilter(targetInput.trim());
    setIpFilter(ipInput.trim());
    setMetadataFilter(metadataInput.trim());
    setFromFilter(fromInput);
    setToFilter(toInput);
  };

  const handleClear = () => {
    setPage(1);
    setActionInput('');
    setActorInput('');
    setTargetInput('');
    setIpInput('');
    setMetadataInput('');
    setFromInput('');
    setToInput('');
    setActionFilter('');
    setActorFilter('');
    setTargetFilter('');
    setIpFilter('');
    setMetadataFilter('');
    setFromFilter('');
    setToFilter('');
  };

  const handleExport = async () => {
    try {
      const baseFilters: Record<string, string | number> = {};
      if (actionFilter) baseFilters.action = actionFilter;
      if (actorFilter) baseFilters.actor = actorFilter;
      if (targetFilter) baseFilters.target = targetFilter;
      if (ipFilter) baseFilters.ip = ipFilter;
      if (metadataFilter) baseFilters.metadataContains = metadataFilter;
      if (fromFilter) baseFilters.from = fromFilter;
      if (toFilter) baseFilters.to = toFilter;

      const firstResponse = await axios.get('/api/audit-events', {
        params: { page: 1, pageSize: 100, ...baseFilters },
      });
      const firstRecords: AuditRecord[] = firstResponse.data.records || [];
      const exportTotalPages = Math.max(firstResponse.data.totalPages || 1, 1);
      let allRecords = [...firstRecords];

      for (let nextPage = 2; nextPage <= exportTotalPages; nextPage += 1) {
        const response = await axios.get('/api/audit-events', {
          params: { page: nextPage, pageSize: 100, ...baseFilters },
        });
        allRecords = allRecords.concat(response.data.records || []);
      }

      const csvEscape = (value: unknown) => {
        const text = String(value ?? '');
        if (text.includes(',') || text.includes('"') || text.includes('\n')) {
          return `"${text.replace(/"/g, '""')}"`;
        }
        return text;
      };

      const header = 'createdAt,actor,action,target,ip,metadata';
      const lines = allRecords.map((row) =>
        [
          csvEscape(row.createdAt),
          csvEscape(row.actor),
          csvEscape(row.action),
          csvEscape(row.target || ''),
          csvEscape(row.ip || ''),
          csvEscape(JSON.stringify(row.metadata || {})),
        ].join(',')
      );

      const csv = [header, ...lines].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'audit-events.csv';
      link.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      showToast('Unable to export audit CSV.', 'error');
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <AdminDashboardLayout activeNavKey="audit">
      <AdminTopbar title="Audit Log" subtitle="Who changed what and when." />

      <div className="flex flex-wrap items-center gap-2">
        <AdminStatPill label="Total Records" value={total} tone="info" />
        <AdminStatPill label="Page" value={`${page}/${totalPages}`} />
        <AdminStatPill label="State" value={loading ? 'Loading' : 'Ready'} tone={loading ? 'warning' : 'success'} />
      </div>

      <AdminRecordsTable
        title="Events"
        subtitle="Latest first."
        rowsControl={{
          value: pageSize,
          options: [10, 25, 50, 100],
          onChange: (nextSize) => {
            setPageSize(nextSize);
            setPage(1);
          },
        }}
        exportControl={{
          onExport: handleExport,
          label: 'Export CSV',
        }}
        filters={(
          <div className="space-y-3">
            <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
              <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Action" value={actionInput} onChange={(e) => setActionInput(e.target.value)} />
              <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Actor" value={actorInput} onChange={(e) => setActorInput(e.target.value)} />
              <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Target" value={targetInput} onChange={(e) => setTargetInput(e.target.value)} />
              <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="IP" value={ipInput} onChange={(e) => setIpInput(e.target.value)} />
              <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" placeholder="Metadata contains" value={metadataInput} onChange={(e) => setMetadataInput(e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" type="date" value={fromInput} onChange={(e) => setFromInput(e.target.value)} />
                <input className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100" type="date" value={toInput} onChange={(e) => setToInput(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleApply}
                className="rounded-md border border-blue-700 bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white dark:border-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Clear
              </button>
            </div>
          </div>
        )}
        emptyMessage="No audit events found."
        summary={<span>Page {page} of {totalPages}</span>}
        pagination={{
          page,
          totalPages,
          onPrev: () => setPage((prev) => Math.max(prev - 1, 1)),
          onNext: () => setPage((prev) => Math.min(prev + 1, totalPages)),
          prevDisabled: page <= 1,
          nextDisabled: page >= totalPages,
        }}
        table={{
          rows: records,
          loading,
          minWidthClassName: 'min-w-[900px]',
          rowKey: (row, idx) => `${row.createdAt}-${idx}`,
          columns: [
            {
              key: 'time',
              header: 'Time',
              render: (row) => new Date(row.createdAt).toLocaleString(),
            },
            {
              key: 'actor',
              header: 'Actor',
              render: (row) => row.actor,
            },
            {
              key: 'action',
              header: 'Action',
              render: (row) => row.action,
            },
            {
              key: 'target',
              header: 'Target',
              render: (row) => row.target || 'N/A',
            },
            {
              key: 'ip',
              header: 'IP',
              render: (row) => row.ip || 'N/A',
            },
            {
              key: 'metadata',
              header: 'Metadata',
              render: (row) => (
                <code className="text-xs text-slate-700 dark:text-slate-200">
                  {JSON.stringify(row.metadata || {})}
                </code>
              ),
            },
          ],
        }}
      />
    </AdminDashboardLayout>
  );
};

export default Audit;
