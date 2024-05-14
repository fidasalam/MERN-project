import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {About,Navbar,Contact,Home} from '../components/User/HomePage';
import '../assets/css/maicons.css';
import '../assets/css/bootstrap.css'; 
import '../assets/vendor/animate/animate.css'; 
import '../assets/css/theme.css'; 
import Login from '../components/User/Login';
import SignUp from '../components/User/SignUp';
import Layout from '../components/User/HomePage';
import ErrorPage from '../components/ErrorPage';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/about" element={<><Navbar/><About /></>} />
      <Route path="/home" element={<><Navbar/><Home /></>} />
      <Route path="/contact" element={<><Navbar/><Contact/></>} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default UserRoutes;
