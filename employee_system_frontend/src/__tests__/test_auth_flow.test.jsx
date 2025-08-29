import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
import { ROUTES } from '../constants/routes';

describe('Auth Flow', () => {
  test('renders login page and can toggle theme', () => {
    const toggleSpy = jest.fn();
    renderWithProviders(<App />);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    // Theme toggle exists and works (button clicks without error)
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleBtn);
  });

  test('login with role navigates to dashboard', async () => {
    renderWithProviders(<App />, { route: ROUTES.login });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'demo@company.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'manager' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // After login App redirects to dashboard content which contains "Welcome Demo User" text in Dashboard.
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
  });

  test('registration route renders and navigates back to login', async () => {
    renderWithProviders(<App />, { route: ROUTES.register });

    expect(screen.getByText(/Create account/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'new@company.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });
  });
});
