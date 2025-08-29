import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from './state/authSlice';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Meetings from './pages/Meetings';
import Tasks from './pages/Tasks';
import Leaves from './pages/Leaves';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import PageLoading from './components/PageLoading';
import { Bell, Calendar, CheckSquare, Clock, Grid, Home, LogOut, PieChart, Settings as SettingsIcon, User } from './components/Icons';
import { rolesConfig } from './constants/rbac';

// PUBLIC_INTERFACE
function App() {
  const { user, loading } = useSelector(selectAuth);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const allowedNav = useMemo(() => {
    const role = user?.role || 'guest';
    return rolesConfig[role]?.nav || [];
  }, [user]);

  if (loading) return <PageLoading />;

  return (
    <Routes>
      <Route path="/auth/login" element={<AuthLayout><Login onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} /></AuthLayout>} />
      <Route path="/auth/register" element={<AuthLayout><Register /></AuthLayout>} />
      <Route element={<ProtectedLayout theme={theme} setTheme={setTheme} />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/auth/login'} state={{ from: location }} replace />} />
    </Routes>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="app-shell" style={{ gridTemplateColumns: '1fr', gridTemplateAreas: '"topbar" "content"' }}>
      <div className="topbar">
        <div style={{ fontWeight: 800, letterSpacing: '.3px' }}>Employee System</div>
        <div className="toolbar">
          <Link to="/auth/login" className="btn ghost">Login</Link>
          <Link to="/auth/register" className="btn">Register</Link>
        </div>
      </div>
      <main className="content">
        <div className="grid cols-2">
          <div className="card">{children}</div>
          <div className="card">
            <h3>Welcome</h3>
            <p className="muted">A modern employee management portal with attendance, tasks, meetings, leaves, analytics, alerts and more.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProtectedLayout({ theme, setTheme }) {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  // PUBLIC_INTERFACE
  const handleLogout = () => dispatch(logout());

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Grid size={18} /> Employee System
        </div>

        <div className="nav-group">
          <div className="label">Main</div>
          <NavLink to="/dashboard" icon={<Home size={16} />} label="Dashboard" />
          <NavLink to="/attendance" icon={<Clock size={16} />} label="Attendance" />
          <NavLink to="/meetings" icon={<Calendar size={16} />} label="Meetings" />
          <NavLink to="/tasks" icon={<CheckSquare size={16} />} label="Tasks" />
          <NavLink to="/leaves" icon={<User size={16} />} label="Leaves" />
          <NavLink to="/analytics" icon={<PieChart size={16} />} label="Analytics" />
          <NavLink to="/notifications" icon={<Bell size={16} />} label="Notifications" />
          <NavLink to="/settings" icon={<SettingsIcon size={16} />} label="Settings" />
        </div>
      </aside>

      <header className="topbar">
        <div className="toolbar">
          <button className="btn ghost" onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
        <div className="toolbar">
          <div className="card" style={{ padding: '6px 10px' }}>{user?.name} • {user?.role}</div>
          <button className="btn ghost" onClick={handleLogout}><LogOut size={16} /> Logout</button>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <OutletPassthrough />
      </main>
    </div>
  );
}

function NavLink({ to, icon, label }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link className={`nav-link ${active ? 'active' : ''}`} to={to}>
      {icon} {label}
    </Link>
  );
}

function OutletPassthrough() {
  // This component renders children routes declared in App's Routes by the router
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/meetings" element={<Meetings />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
