import React from 'react';
import { TrendArea, Bars } from '../components/Chart';

// PUBLIC_INTERFACE
function Analytics() {
  const productivity = Array.from({ length: 8 }).map((_, i) => ({ label: `W${i+1}`, value: Math.round(70 + Math.random()*25) }));
  const teams = [
    { label: 'Sales', value: 88 },
    { label: 'Support', value: 76 },
    { label: 'Eng', value: 92 },
    { label: 'HR', value: 69 },
  ];
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h3>Weekly Productivity</h3>
        <TrendArea data={productivity} />
      </div>
      <div className="card">
        <h3>Team Comparison</h3>
        <Bars data={teams} />
      </div>
      <div className="card">
        <h3>Compliance & Alerts</h3>
        <ul>
          <li>3 employees breached daily break policy</li>
          <li>Geo-fence mismatch in 2 attendance logs</li>
          <li>2 overdue tasks flagged for escalation</li>
        </ul>
      </div>
    </div>
  );
}
export default Analytics;
