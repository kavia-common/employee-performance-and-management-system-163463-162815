import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

describe('Notifications and Settings Pages', () => {
  function login() {
    renderWithProviders(<App />, { route: '/auth/login' });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'n@n.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  }

  test('notifications list shows items', async () => {
    login();
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Notifications/i }));
      expect(screen.getByText(/Notification Center/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Task Assigned/i)).toBeInTheDocument();
  });

  test('settings toggles can be clicked', async () => {
    login();
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Settings/i }));
      expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    });

    const [notifToggle, emailToggle] = screen.getAllByRole('checkbox');
    fireEvent.click(notifToggle);
    fireEvent.click(emailToggle);
    // Save button exists
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });
});
