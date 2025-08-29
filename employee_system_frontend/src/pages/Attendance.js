import React, { useState } from 'react';

// PUBLIC_INTERFACE
function Attendance() {
  const [mode, setMode] = useState('manual');
  const [notes, setNotes] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setStatus(`Checked in via ${mode} at ${new Date().toLocaleTimeString()}`);
  };

  const onFaceCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition((pos) => {
      setNotes(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
    }, () => alert('Unable to get location'));
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h3>Attendance Check-in</h3>
        <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
          <div className="field">
            <label>Mode</label>
            <select className="select" value={mode} onChange={e => setMode(e.target.value)}>
              <option value="manual">Manual</option>
              <option value="gps">GPS</option>
              <option value="face">Face</option>
            </select>
          </div>
          {mode === 'gps' && (
            <div className="toolbar">
              <button className="btn" type="button" onClick={requestLocation}>Get GPS</button>
            </div>
          )}
          {mode === 'face' && (
            <div className="field">
              <label>Upload Face Photo</label>
              <input type="file" accept="image/*" onChange={onFaceCapture} />
              {imagePreview && <img src={imagePreview} alt="preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, marginTop: 8 }} />}
            </div>
          )}
          <div className="field">
            <label>Notes</label>
            <textarea className="textarea" rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Shift notes or GPS coordinates" />
          </div>
          <div className="toolbar">
            <button className="btn" type="submit">Check In</button>
            <button className="btn ghost" type="button" onClick={() => setStatus(`Checked out at ${new Date().toLocaleTimeString()}`)}>Check Out</button>
          </div>
          {status && <div className="card">{status}</div>}
        </form>
      </div>

      <div className="card">
        <h3>Breaks & Schedule</h3>
        <div className="grid cols-2">
          <div>
            <div className="field">
              <label>Break Start</label>
              <input className="input" type="time" />
            </div>
            <div className="field">
              <label>Break End</label>
              <input className="input" type="time" />
            </div>
            <button className="btn">Save Break</button>
          </div>
          <div>
            <div className="field">
              <label>Work Schedule</label>
              <select className="select">
                <option>09:00 - 17:00</option>
                <option>10:00 - 18:00</option>
                <option>Custom</option>
              </select>
            </div>
            <button className="btn">Save Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Attendance;
