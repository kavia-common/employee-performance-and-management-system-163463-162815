import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../state/authSlice';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerSuccess());
    navigate('/auth/login');
  };

  return (
    <div>
      <h2>Create account</h2>
      <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
        <div className="field"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div className="field"><label>Email</label><input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <div className="field"><label>Password</label><input className="input" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
        <div className="field">
          <label>Role</label>
          <select className="select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="employee">Employee</option>
            <option value="team_leader">Team Leader</option>
            <option value="manager">Manager</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <div className="toolbar">
          <button className="btn">Register</button>
          <Link to="/auth/login" className="btn ghost">Back to login</Link>
        </div>
      </form>
    </div>
  );
}
export default Register;
