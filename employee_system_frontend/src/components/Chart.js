import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts';

// PUBLIC_INTERFACE
export function TrendArea({ data }) {
  return (
    <div style={{ width: '100%', height: 160 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F26A1B" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#F26A1B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="label" hide />
          <YAxis hide />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#F26A1B" fillOpacity={1} fill="url(#g1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Bars({ data }) {
  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0B3954" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
