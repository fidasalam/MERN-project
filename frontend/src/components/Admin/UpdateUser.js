import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [message, setMessage] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');
                const response = await axios.get(`http://localhost:5000/api/admin/updateuser/${userId}`, {
                    headers: {
                        'x-auth-token': adminToken
                    }
                });
                const userData = response.data.user;
                setFormData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/admin/adminLogin');
                
            }
        };

        fetchData();
    }, );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adminToken = localStorage.getItem('adminToken'); 
            await axios.post('http://localhost:5000/api/admin/updateuser', {
                userId: userId,
                ...formData
            }, {
                headers: {
                    'x-auth-token': adminToken 
                }
            });
            setMessage('User information updated successfully');
        } catch (error) {
            console.error('Error updating user information:', error);
        // Navigate to admin login page
        }
    };

    return (
        <div className="container">
            <div className="card1 mb-4 mt-3">
                <div className="card-header">
                    <h3 className="mt-4 text-center">Update User</h3>
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
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                        {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">{message}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
