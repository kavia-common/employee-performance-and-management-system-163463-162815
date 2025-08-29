import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

describe('Tasks Page', () => {
  test('add task shows in list', async () => {
    renderWithProviders(<App />, { route: '/auth/login' });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 't@t.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Tasks/i }));
      expect(screen.getByText(/Create Task/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Write tests' } });
    fireEvent.change(screen.getByLabelText(/Assignee/i), { target: { value: 'You' } });
    fireEvent.change(screen.getByLabelText(/^Due$/i), { target: { value: '2025-09-15' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

    await waitFor(() => {
      expect(screen.getByText(/Write tests/i)).toBeInTheDocument();
    });
  });
});
