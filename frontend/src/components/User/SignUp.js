import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      console.log('User created successfully');
      navigate('/signin');
    } catch (error) {
      console.error('Error in signup:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="form">
        <h2>Create new Account</h2>
        <form className="signup-form mt-5" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign Up</button>
          <p className="message">Already have an account? <Link to="/signin">Sign In</Link></p>
          {errorMessage && <p className="error-message text-danger">{errorMessage}</p>} 
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
