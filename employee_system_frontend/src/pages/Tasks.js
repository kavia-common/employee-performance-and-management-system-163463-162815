import React, { useState } from 'react';

// PUBLIC_INTERFACE
function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Build UI', status: 'In Progress', assignee: 'You', due: '2025-09-05' },
    { id: 2, title: 'Integrate API', status: 'Pending', assignee: 'Alex', due: '2025-09-10' },
  ]);
  const [form, setForm] = useState({ title: '', assignee: '', due: '' });

  const addTask = (e) => {
    e.preventDefault();
    setTasks([{ id: Date.now(), status: 'Pending', ...form }, ...tasks]);
    setForm({ title: '', assignee: '', due: '' });
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h3>Create Task</h3>
        <form onSubmit={addTask} className="grid" style={{ gap: 12 }}>
          <div className="field"><label>Title</label><input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="field"><label>Assignee</label><input className="input" value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })} /></div>
          <div className="field"><label>Due</label><input className="input" type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} /></div>
          <button className="btn">Add Task</button>
        </form>
      </div>
      <div className="card">
        <h3>Tasks</h3>
        <table className="table">
          <thead><tr><th>Title</th><th>Assignee</th><th>Due</th><th>Status</th></tr></thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}><td>{t.title}</td><td>{t.assignee}</td><td>{t.due}</td><td>{t.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Tasks;
