import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminRecordsTable from '../../components/admin/AdminRecordsTable';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';

type EmailHistoryRecord = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  comment: string;
  createdAt: string;
};

type EmailHistoryResponse = {
  records: EmailHistoryRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const EMAIL_HISTORY_ENDPOINTS = [
  '/api/contact-email-history',
  '/api/email-history',
  '/api/send-email-history',
];

const EMAIL_HISTORY_EXPORT_ENDPOINTS = [
  '/api/contact-email-history/export.csv',
  '/api/email-history/export.csv',
  '/api/send-email-history/export.csv',
];

const formatTimestamp = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const EmailHistory = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [records, setRecords] = useState<EmailHistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [emailInput, setEmailInput] = useState('');
  const [emailFilter, setEmailFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const loadEmailHistory = async () => {
      const attempts = EMAIL_HISTORY_ENDPOINTS.map((endpoint) => ({
        endpoint,
        params: {
          page,
          pageSize,
          email: emailFilter || undefined,
        },
      }));
      attempts.push({
        endpoint: '/api/email-history',
        params: {
          page,
          limit: pageSize,
          email: emailFilter || undefined,
        },
      });

      let success = false;

      for (const attempt of attempts) {
        try {
          const response = await axios.get<EmailHistoryResponse>(attempt.endpoint, {
            params: attempt.params,
          });
          setRecords(response.data.records || []);
          setTotal(response.data.total || 0);
          setTotalPages(Math.max(response.data.totalPages || 1, 1));
          success = true;
          break;
        } catch {
          // try next endpoint/param shape
        }
      }

      if (!success) {
        showToast('Unable to load email history.', 'error');
      }

      setLoading(false);
    };

    void loadEmailHistory();
  }, [isAuthenticated, page, pageSize, emailFilter, showToast]);

  const handleApply = () => {
    setPage(1);
    setEmailFilter(emailInput.trim());
  };
  const handleClear = () => {
    setEmailInput('');
    setPage(1);
    setEmailFilter('');
  };
  const handleExportCsv = async () => {
    let exported = false;

    for (const endpoint of EMAIL_HISTORY_EXPORT_ENDPOINTS) {
      try {
        const response = await axios.get(endpoint, {
          params: {
            email: emailFilter || undefined,
          },
          responseType: 'blob',
        });
        const blobUrl = window.URL.createObjectURL(response.data as Blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'contact-email-history.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        exported = true;
        break;
      } catch {
        // try next export endpoint
      }
    }

    if (!exported) {
      showToast('Unable to export CSV.', 'error');
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <AdminDashboardLayout activeNavKey="email_history">
      <AdminTopbar title="Email History" subtitle="Contact form submissions." />

      <div className="flex flex-wrap items-center gap-2">
        <AdminStatPill label="Total Records" value={total} tone="info" />
        <AdminStatPill label="Page" value={`${page}/${totalPages}`} />
        <AdminStatPill label="State" value={loading ? 'Loading' : 'Ready'} tone={loading ? 'warning' : 'success'} />
      </div>

      <AdminRecordsTable
        title="Submissions"
        subtitle="Newest first."
        rowsControl={{
          value: pageSize,
          options: [10, 25, 50, 100],
          onChange: (nextSize) => {
            setPageSize(nextSize);
            setPage(1);
          },
        }}
        filters={(
          <div className="space-y-3">
            <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
              <input
                className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Email"
                value={emailInput}
                onChange={(event) => setEmailInput(event.target.value)}
              />
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
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                className="rounded-md border border-emerald-700 bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white dark:border-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Export CSV
              </button>
            </div>
          </div>
        )}
        emptyMessage="No email submissions found."
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
          rowKey: (row) => row.id,
          minWidthClassName: 'min-w-[980px]',
          columns: [
            {
              key: 'createdAt',
              header: 'Date',
              render: (row) => <span>{formatTimestamp(row.createdAt)}</span>,
            },
            {
              key: 'name',
              header: 'Name',
              render: (row) => <span>{`${row.firstname} ${row.lastname}`.trim()}</span>,
            },
            {
              key: 'email',
              header: 'Email',
              render: (row) => <span>{row.email}</span>,
            },
            {
              key: 'phone',
              header: 'Phone',
              render: (row) => <span>{row.phone_number || '-'}</span>,
            },
            {
              key: 'comment',
              header: 'Message',
              render: (row) => <span>{row.comment}</span>,
            },
          ],
        }}
      />
    </AdminDashboardLayout>
  );
};

export default EmailHistory;
