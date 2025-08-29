import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './test-utils';

test('renders login heading by default', () => {
  renderWithProviders(<App />, { route: '/auth/login' });
  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});
