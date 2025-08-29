import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

describe('Meetings Page', () => {
  test('create meeting adds to list', async () => {
    renderWithProviders(<App />, { route: '/auth/login' });

    // Login
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'm@m.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Go to meetings
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Meetings/i }));
      expect(screen.getByText(/Schedule Meeting/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Demo Sync' } });
    fireEvent.change(screen.getByLabelText(/^Date$/i), { target: { value: '2025-09-12' } });
    fireEvent.change(screen.getByLabelText(/^Time$/i), { target: { value: '11:00' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Meeting/i }));

    await waitFor(() => {
      expect(screen.getByText(/Demo Sync/i)).toBeInTheDocument();
    });
  });
});
