import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

describe('Analytics Page', () => {
  test('renders analytics headings and chart containers', async () => {
    renderWithProviders(<App />, { route: '/auth/login' });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Analytics/i }));
      expect(screen.getByText(/Weekly Productivity/i)).toBeInTheDocument();
    });

    // chart containers mocked by __mocks__/recharts
    expect(screen.getByText(/Team Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Compliance & Alerts/i)).toBeInTheDocument();
  });
});
