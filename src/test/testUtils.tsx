import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = (ui: ReactElement, route = '/email-history') => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};
