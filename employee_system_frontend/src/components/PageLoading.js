import React from 'react';

const PageLoading = () => (
  <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
    <div className="card" style={{ padding: 24 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Loading...</div>
      <div className="muted">Please wait</div>
    </div>
  </div>
);

export default PageLoading;
