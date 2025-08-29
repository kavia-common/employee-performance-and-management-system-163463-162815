import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../state/authSlice';
import { TrendArea, Bars } from '../components/Chart';

// PUBLIC_INTERFACE
function Dashboard() {
  const { user } = useSelector(selectAuth);
  const kpis = [
    { label: 'Attendance', value: '96%' },
    { label: 'Tasks Completed', value: '42' },
    { label: 'Meetings', value: '8' },
    { label: 'Leaves Pending', value: '3' },
  ];
  const trend = Array.from({ length: 12 }).map((_, i) => ({ label: `W${i+1}`, value: Math.round(60 + Math.random()*40) }));
  const bars = [
    { label: 'Team A', value: 82 },
    { label: 'Team B', value: 75 },
    { label: 'Team C', value: 91 },
  ];

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid cols-4">
        {kpis.map(k => (
          <div className="card kpi" key={k.label}>
            <div className="label">{k.label}</div>
            <div className="value">{k.value}</div>
          </div>
        ))}
      </div>
      <div className="grid cols-2">
        <div className="card">
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Productivity Trend</div>
          <TrendArea data={trend} />
        </div>
        <div className="card">
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Team Performance</div>
          <Bars data={bars} />
        </div>
      </div>
      <div className="card">
        <div style={{ marginBottom: 8, fontWeight: 700 }}>Welcome {user?.name} ({user?.role})</div>
        <p className="muted">This dashboard adapts to your role. Admins/managers see team analytics, employees see personal stats.</p>
      </div>
    </div>
  );
}
export default Dashboard;
