import React from 'react';

// PUBLIC_INTERFACE
function NotFound() {
  /** A simple 404 page component. */
  return (
    <div className="card">
      <h3>Page Not Found</h3>
      <p className="muted">The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
