import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  selectAdminError } from '../../features/admin/adminSlice';
import { adminLogin } from '../../features/admin/adminActions';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAdminError);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(adminLogin(formData, navigate));
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Admin Sign In</h2>
        <form className="login-form mt-5" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign In</button>
          {/* <p className="message">Not an admin? <Link to="/signin">Sign In</Link></p> */}
          {error && <p className="error-message text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
