import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Container from '../../components/Container';
import SectionHeader from '../../components/heading/SectionHeader';
import AdminNav from '../../modules/AdminNav';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';

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

const History = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<HistoryRow[]>([]);

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
        showToast('Oh no! Unable to get history.', 'error');
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

  return (
    <Container classValue="bg-base-200 lg:px-8">
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <div className="lg:grid lg:grid-cols-6 gap-4">
          <AdminNav page="history" />
          <div className="col-span-5">
            <SectionHeader title="History" horizontalLine={true} headerPadding={0}>
              <div className="bg-white p-6 rounded-lg shadow-md mt-4 overflow-x-auto">
                {loading && <p>Loading history...</p>}
                {!loading && sortedRows.length === 0 && <p>No history found.</p>}
                {!loading && sortedRows.length > 0 && (
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Path</th>
                        <th>Referrer</th>
                        <th>IP</th>
                        <th>User Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedRows.map((row, index) => (
                        <tr key={`${getHistoryTime(row)}-${index}`}>
                          <td>{getHistoryTime(row)}</td>
                          <td>{getFirstString(row, ['path', 'route']) || 'N/A'}</td>
                          <td>{getFirstString(row, ['referrer']) || 'N/A'}</td>
                          <td>{getFirstString(row, ['ip', 'ipAddress']) || 'N/A'}</td>
                          <td>
                            {getFirstString(row, ['userAgent', 'user_agent', 'ua']) ||
                              'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </SectionHeader>
          </div>
        </div>
      )}
    </Container>
  );
};

export default History;
