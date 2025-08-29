import React from 'react';

// PUBLIC_INTERFACE
function Notifications() {
  const data = [
    { id: 1, title: 'Task Assigned', time: '2m ago' },
    { id: 2, title: 'Meeting in 30 min', time: '25m ago' },
    { id: 3, title: 'Leave Approved', time: '1h ago' },
  ];
  return (
    <div className="card">
      <h3>Notification Center</h3>
      <ul>
        {data.map(n => <li key={n.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>{n.title} • <span className="muted">{n.time}</span></li>)}
      </ul>
    </div>
  );
}
export default Notifications;
