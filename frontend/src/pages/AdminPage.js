import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import AdminLogin from '../components/Admin/AdminLogin';
import UserList from '../components/Admin/UserList';
import AddUser from '../components/Admin/AddUser';
import UpdateUser from '../components/Admin/UpdateUser';
import '../adminassets/css/styles.css';

const AdminPage = () => {
  return (
    <Routes>
    
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/adminLogin" element={<AdminLogin />} />
      <Route path="/admin/userList" element={<Dashboard />}>
        <Route index element={<UserList />} />
      </Route>
      <Route path="/admin/addUser" element={<Dashboard />}>
        <Route index element={<AddUser />} />
      </Route>

      <Route path="/admin/updateUser/:userId" element={<Dashboard />}>
        <Route index element={<UpdateUser />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
