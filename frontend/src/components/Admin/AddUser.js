

import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(null); // State to store response message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/admin/adduser', formData);
            setMessage(response.data.message); // Store response message
            // Clear form fields after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setMessage('Error adding user');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mb-4 mt-5">
                    <div className="card-header">
                    <h3 className="mt-4 text-center">Add User</h3> {/* Centered heading */}
                </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
