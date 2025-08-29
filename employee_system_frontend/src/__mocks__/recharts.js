import React from 'react';

const passthrough = ({ children, ...rest }) => <div data-testid="recharts-mock" {...rest}>{children}</div>;

export const ResponsiveContainer = passthrough;
export const AreaChart = passthrough;
export const Area = passthrough;
export const Tooltip = passthrough;
export const XAxis = passthrough;
export const YAxis = passthrough;
export const BarChart = passthrough;
export const Bar = passthrough;

export default {};
