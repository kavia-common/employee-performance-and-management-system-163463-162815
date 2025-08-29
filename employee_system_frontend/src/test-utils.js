import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from './state/store';

// Helper to render components with Redux Provider and MemoryRouter.
export function renderWithProviders(ui, { route = '/', storeOverride = store } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(
    <Provider store={storeOverride}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}
