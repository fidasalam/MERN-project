import React from 'react';
import Navbar from '../components/User/HomePage/Navbar';

const UserLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default UserLayout;
