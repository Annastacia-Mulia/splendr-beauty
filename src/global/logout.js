import React from 'react';
import { useNavigate } from 'react-router-dom';




const Logout = () => {
    const navigate = useNavigate();

  const handlePress = (event) => {
    event.preventDefault();
    window.confirm('Are you sure you want to log out?');
    window.alert('Successfully logged out. Log in again to continue.');
    navigate('/login2')
  };

  return (
    <button onClick={handlePress}>
      Logout
    </button>
  );
};

export default Logout;
