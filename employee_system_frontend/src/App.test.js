import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';
import { BrowserRouter } from 'react-router-dom';

test('renders login heading', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const heading = screen.getByText(/Sign in/i);
  expect(heading).toBeInTheDocument();
});
