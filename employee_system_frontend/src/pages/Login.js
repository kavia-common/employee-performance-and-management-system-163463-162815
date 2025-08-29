import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginError, loginStart, loginSuccess } from '../state/authSlice';
import { setAuthToken } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function Login({ onThemeToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // Mock login success
      const fake = { token: 'demo-token', user: { id: 1, name: 'Demo User', role } };
      setAuthToken(fake.token);
      dispatch(loginSuccess(fake));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      dispatch(loginError('Login failed'));
    }
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
        <div className="field">
          <label>Email</label>
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div className="field">
          <label>Role</label>
          <select className="select" value={role} onChange={e => setRole(e.target.value)}>
            <option value="super_admin">Super Admin</option>
            <option value="manager">Manager</option>
            <option value="team_leader">Team Leader</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="toolbar">
          <button className="btn" type="submit">Login</button>
          <button className="btn ghost" type="button" onClick={onThemeToggle}>Toggle Theme</button>
          <Link to="/auth/register" className="btn secondary">Create account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
