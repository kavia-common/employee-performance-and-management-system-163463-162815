import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

describe('Attendance Page', () => {
  function loginAndGoToAttendance() {
    renderWithProviders(<App />, { route: '/auth/login' });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    return waitFor(() => {
      // Navigate to attendance
      fireEvent.click(screen.getByRole('link', { name: /Attendance/i }));
      expect(screen.getByText(/Attendance Check-in/i)).toBeInTheDocument();
    });
  }

  test('switch modes and submit check-in', async () => {
    await loginAndGoToAttendance();

    // Default manual mode present
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();

    // Switch to gps and click Get GPS (will alert if geolocation missing; ensure button exists)
    fireEvent.change(screen.getByLabelText(/Mode/i), { target: { value: 'gps' } });
    const gpsBtn = screen.getByRole('button', { name: /Get GPS/i });
    expect(gpsBtn).toBeInTheDocument();

    // Switch to face and check file input presence
    fireEvent.change(screen.getByLabelText(/Mode/i), { target: { value: 'face' } });
    expect(screen.getByLabelText(/Upload Face Photo/i)).toBeInTheDocument();

    // Back to manual and submit
    fireEvent.change(screen.getByLabelText(/Mode/i), { target: { value: 'manual' } });
    fireEvent.click(screen.getByRole('button', { name: /Check In/i }));
    await waitFor(() => {
      expect(screen.getByText(/Checked in via manual/i)).toBeInTheDocument();
    });

    // Check out
    fireEvent.click(screen.getByRole('button', { name: /Check Out/i }));
    await waitFor(() => {
      expect(screen.getByText(/Checked out/i)).toBeInTheDocument();
    });
  });
});
