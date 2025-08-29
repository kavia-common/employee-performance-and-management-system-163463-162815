 // jest-dom adds custom jest matchers for asserting on DOM nodes.
 // allows you to do things like:
 // expect(element).toHaveTextContent(/react/i)
 // learn more: https://github.com/testing-library/jest-dom
 import React from 'react';
import '@testing-library/jest-dom';

 // Mock matchMedia for components or libs that check it
 if (typeof window !== 'undefined' && !window.matchMedia) {
   window.matchMedia = function matchMedia(query) {
     return {
       matches: false,
       media: query,
       onchange: null,
       addListener: () => {}, // deprecated
       removeListener: () => {}, // deprecated
       addEventListener: () => {},
       removeEventListener: () => {},
       dispatchEvent: () => false,
     };
   };
 }

 // Jest doesn't automatically use __mocks__ for ESM without mapper, but CRA/jest will prefer manual mocks in __mocks__ for commonjs.
 // Ensure recharts resolves to our mock in tests if test environment requires it.
 try {
  jest.mock('recharts', () => {
    const Passthrough = (props) => {
      const children = props && props.children;
      const clone = {};
      for (const k in props) { if (k !== "children" && Object.prototype.hasOwnProperty.call(props, k)) clone[k] = props[k]; }
      return React.createElement('div', Object.assign({ 'data-testid': 'recharts-mock' }, clone), children);
    };
    return { __esModule: true, ResponsiveContainer: Passthrough, AreaChart: Passthrough, Area: Passthrough, Tooltip: Passthrough, XAxis: Passthrough, YAxis: Passthrough, BarChart: Passthrough, Bar: Passthrough, default: {} };
  });
} catch (e) {
  // noop if jest is not available in this scope
}

