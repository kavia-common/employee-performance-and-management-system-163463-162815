 // jest-dom adds custom jest matchers for asserting on DOM nodes.
 // allows you to do things like:
 // expect(element).toHaveTextContent(/react/i)
 // learn more: https://github.com/testing-library/jest-dom
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

 // Ensure recharts is mocked without referencing React outside the factory
 try {
   jest.mock('recharts', () => ({
     __esModule: true,
     ResponsiveContainer: () => null,
     AreaChart: () => null,
     Area: () => null,
     Tooltip: () => null,
     XAxis: () => null,
     YAxis: () => null,
     BarChart: () => null,
     Bar: () => null,
     default: {},
   }));
 } catch (e) {
   // noop if jest is not available in this scope
 }
