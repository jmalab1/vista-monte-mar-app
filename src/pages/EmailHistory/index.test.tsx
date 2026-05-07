import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailHistory from './index';
import { renderWithRouter } from '../../test/testUtils';
import axios from '../../utility/axiosInstance';

const mockUseAuth = vi.fn();
const mockShowToast = vi.fn();

vi.mock('../../utility/axiosInstance');
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));
vi.mock('../../context/AdminPreferencesContext', () => ({
  useAdminPreferences: () => ({
    preferences: {
      darkMode: false,
    },
  }),
}));

describe('EmailHistory page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
  });

  it('redirects unauthenticated users to login', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderWithRouter(<EmailHistory />);

    expect(screen.queryByText('Email History')).not.toBeInTheDocument();
  });

  it('loads and renders records table', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        records: [
          {
            id: '1',
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'jane@example.com',
            phone_number: '',
            comment: 'hello',
            createdAt: '2026-04-28T18:45:01.000Z',
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      },
    } as never);

    renderWithRouter(<EmailHistory />);

    expect(
      await screen.findByRole('heading', { name: 'Email History' })
    ).toBeInTheDocument();
    expect(await screen.findByText('jane@example.com')).toBeInTheDocument();
  });

  it('applies filters and sends expected query params', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { records: [], total: 0, page: 1, pageSize: 10, totalPages: 1 },
    } as never);

    renderWithRouter(<EmailHistory />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'jane@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        '/api/contact-email-history',
        expect.objectContaining({
          params: expect.objectContaining({ email: 'jane@example.com' }),
        })
      );
    });
  });

  it('clears filters and reloads without email param', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { records: [], total: 0, page: 1, pageSize: 10, totalPages: 1 },
    } as never);

    renderWithRouter(<EmailHistory />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'jane@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenLastCalledWith(
        '/api/contact-email-history',
        expect.objectContaining({
          params: expect.objectContaining({ email: undefined }),
        })
      );
    });
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
  });

  it('exports csv with blob response', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { records: [], total: 0, page: 1, pageSize: 10, totalPages: 1 },
    } as never);

    if (!window.URL.createObjectURL) {
      Object.defineProperty(window.URL, 'createObjectURL', {
        writable: true,
        value: vi.fn(),
      });
    }
    if (!window.URL.revokeObjectURL) {
      Object.defineProperty(window.URL, 'revokeObjectURL', {
        writable: true,
        value: vi.fn(),
      });
    }
    const createObjectUrlSpy = vi.spyOn(window.URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    const revokeObjectUrlSpy = vi.spyOn(window.URL, 'revokeObjectURL').mockImplementation(() => {});

    const clickSpy = vi.fn();
    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const removeSpy = vi.spyOn(document.body, 'removeChild');
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = document.createElementNS('http://www.w3.org/1999/xhtml', tagName) as HTMLAnchorElement;
      if (tagName === 'a') {
        element.click = clickSpy;
      }
      return element;
    });

    renderWithRouter(<EmailHistory />);

    await userEvent.click(screen.getByRole('button', { name: 'Export CSV' }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        '/api/contact-email-history/export.csv',
        expect.objectContaining({
          params: expect.objectContaining({ email: undefined }),
          responseType: 'blob',
        })
      );
    });
    expect(createObjectUrlSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(revokeObjectUrlSpy).toHaveBeenCalledWith('blob:mock-url');

    createObjectUrlSpy.mockRestore();
    revokeObjectUrlSpy.mockRestore();
    createElementSpy.mockRestore();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
