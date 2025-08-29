import React from 'react';
import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

describe('Leaves Page', () => {
  test('submit leave and approve it', async () => {
    renderWithProviders(<App />, { route: '/auth/login' });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'l@l.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Leaves/i }));
      expect(screen.getByText(/Request Leave/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/^From$/i), { target: { value: '2025-09-03' } });
    fireEvent.change(screen.getByLabelText(/^To$/i), { target: { value: '2025-09-04' } });
    fireEvent.change(screen.getByLabelText(/Reason/i), { target: { value: 'Vacation' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Pending/).length).toBeGreaterThan(0);
    });

    // Approve first row
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];
    const approveBtn = within(firstDataRow).getByRole('button', { name: /Approve/i });
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(within(firstDataRow).getByText(/Approved/)).toBeInTheDocument();
    });
  });
});
