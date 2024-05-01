import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userActions';
import {  selectUserError } from '../../features/user/userSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectUserError);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(login(formData));
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Login</h2>
        <form className="login-form mt-5" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <div className="text-right mb-3">
            <a href="password-reset.html" className="small" style={{ color: "grey" }}>
              Forgot Your Password?
            </a>
          </div>
          <button type="submit">Sign In</button>
          <p className="message">Don't have an account? <Link to="/signup">Sign Up</Link></p>
          {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
