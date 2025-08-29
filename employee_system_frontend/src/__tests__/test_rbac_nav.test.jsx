import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

const navItems = ['Dashboard','Attendance','Meetings','Tasks','Leaves','Analytics','Notifications','Settings'];

describe('RBAC Navigation', () => {
  test('all main nav links are visible after login regardless of role (static sidebar)', async () => {
    renderWithProviders(<App />, { route: '/auth/login' });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'x@x.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'employee' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      navItems.forEach(label => {
        expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
      });
    });
  });
});
