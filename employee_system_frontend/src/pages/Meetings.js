import React, { useState } from 'react';

// PUBLIC_INTERFACE
function Meetings() {
  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Sprint Planning', date: '2025-09-01', time: '10:00', attendees: 8 },
    { id: 2, title: 'Design Review', date: '2025-09-02', time: '15:00', attendees: 5 },
  ]);
  const [form, setForm] = useState({ title: '', date: '', time: '' });

  const addMeeting = (e) => {
    e.preventDefault();
    setMeetings([{ id: Date.now(), attendees: 1, ...form }, ...meetings]);
    setForm({ title: '', date: '', time: '' });
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h3>Schedule Meeting</h3>
        <form onSubmit={addMeeting} className="grid" style={{ gap: 12 }}>
          <div className="field"><label>Title</label><input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="field"><label>Date</label><input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
          <div className="field"><label>Time</label><input className="input" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /></div>
          <button className="btn">Add Meeting</button>
        </form>
      </div>
      <div className="card">
        <h3>Upcoming Meetings</h3>
        <table className="table">
          <thead><tr><th>Title</th><th>Date</th><th>Time</th><th>Attendees</th></tr></thead>
          <tbody>
            {meetings.map(m => (
              <tr key={m.id}><td>{m.title}</td><td>{m.date}</td><td>{m.time}</td><td>{m.attendees}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Meetings;
