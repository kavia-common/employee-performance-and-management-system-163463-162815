import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
import store from '../state/store';
import { loginSuccess } from '../state/authSlice';

function loginAs(role = 'employee') {
  store.dispatch(loginSuccess({ token: 't', user: { id: 1, name: 'Demo User', role } }));
}

describe('Routing and Protected Layout', () => {
  test('redirects to login when unauthenticated', () => {
    renderWithProviders(<App />, { route: '/dashboard' });
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test('renders sidebar and topbar after login and supports logout', async () => {
    renderWithProviders(<App />, { route: '/auth/login' });

    // Perform login via form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'demo@company.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // Sidebar links present
      expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Attendance/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Meetings/i })).toBeInTheDocument();
    });

    // Logout
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });
  });

  test('theme toggle button toggles label', async () => {
    // Pre-login directly via store to land on dashboard
    loginAs('employee');
    renderWithProviders(<App />, { route: '/dashboard' });

    await waitFor(() => {
      expect(screen.getByText(/Toggle/i)).toBeInTheDocument();
    });

    const toggleBtn = screen.getByRole('button', { name: /Toggle/i });
    const labelBefore = toggleBtn.textContent;
    fireEvent.click(toggleBtn);
    expect(toggleBtn.textContent).not.toEqual(labelBefore);
  });
});
