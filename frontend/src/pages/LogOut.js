import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all session storage items
    sessionStorage.clear();

    // Redirect to login page
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
