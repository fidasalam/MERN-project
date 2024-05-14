import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import AdminLogin from '../components/Admin/AdminLogin';
import UserList from '../components/Admin/UserList';
import AddUser from '../components/Admin/AddUser';
import UpdateUser from '../components/Admin/UpdateUser';
import '../adminassets/css/styles.css';

const AdminRoutes = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Dashboard />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/userList" element={<Dashboard />}>
        <Route index element={<UserList />} />
      </Route>
      <Route path="/addUser" element={<Dashboard />}>
        <Route index element={<AddUser />} />
      </Route>

      <Route path="/updateUser/:userId" element={<Dashboard />}>
        <Route index element={<UpdateUser />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
