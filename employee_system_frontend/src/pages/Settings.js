import React, { useState } from 'react';

// PUBLIC_INTERFACE
function Settings() {
  const [prefs, setPrefs] = useState({ notifications: true, emailDigest: false });

  return (
    <div className="card">
      <h3>Settings</h3>
      <div className="grid" style={{ gap: 12 }}>
        <label><input type="checkbox" checked={prefs.notifications} onChange={e => setPrefs({ ...prefs, notifications: e.target.checked })} /> Enable notifications</label>
        <label><input type="checkbox" checked={prefs.emailDigest} onChange={e => setPrefs({ ...prefs, emailDigest: e.target.checked })} /> Daily email digest</label>
        <button className="btn">Save</button>
      </div>
    </div>
  );
}
export default Settings;
