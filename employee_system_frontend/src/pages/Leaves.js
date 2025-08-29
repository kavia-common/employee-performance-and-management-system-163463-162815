import React, { useState } from 'react';

// PUBLIC_INTERFACE
function Leaves() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'You', from: '2025-09-03', to: '2025-09-05', status: 'Pending' },
  ]);
  const [form, setForm] = useState({ from: '', to: '', reason: '' });

  const submit = (e) => {
    e.preventDefault();
    setRequests([{ id: Date.now(), name: 'You', status: 'Pending', ...form }, ...requests]);
    setForm({ from: '', to: '', reason: '' });
  };

  const setStatus = (id, status) => setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h3>Request Leave</h3>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <div className="field"><label>From</label><input className="input" type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></div>
          <div className="field"><label>To</label><input className="input" type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></div>
          <div className="field"><label>Reason</label><textarea className="textarea" rows={3} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} /></div>
          <button className="btn">Submit</button>
        </form>
      </div>
      <div className="card">
        <h3>Pending Approvals</h3>
        <table className="table">
          <thead><tr><th>Employee</th><th>From</th><th>To</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.from}</td><td>{r.to}</td><td>{r.status}</td>
                <td className="toolbar">
                  <button className="btn" onClick={() => setStatus(r.id, 'Approved')}>Approve</button>
                  <button className="btn ghost" onClick={() => setStatus(r.id, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Leaves;
