import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [noSuggestionsMessage, setNoSuggestionsMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');

                const response = await axios.get('http://localhost:5000/api/admin/userList', {
                    headers: {
                        'x-auth-token': adminToken
                    }
                });
                console.log(response)
                setUsers(response.data.users);
            } catch (error) {
                
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    // Function to handle search input change and fetch suggestions
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        try {
            const response = await axios.post('http://localhost:5000/api/admin/search', { searchQuery: query });
            if (response.data.users && response.data.users.length > 0) {
                setSuggestions(response.data.users);
                setNoSuggestionsMessage(''); // Reset message
            } else if (response.data.message) {
                setSuggestions([]); // Reset suggestions
                setNoSuggestionsMessage(response.data.message); // Set the message
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setNoSuggestionsMessage('');
        }
    };

    return (
        <div className="card mb-4 ml-3 mt-3">
            <div className="card-header">
                <h3 className="mt-4">UserList</h3>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for users..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {/* Display suggestions and message */}
                    {searchQuery.trim() !== '' && (
                        <ul className="list-group mt-3">
                            {suggestions.map((user) => (
                                <li key={user._id} className="list-group-item">
                                    <Link to={`/admin/updateUser/${user._id}`}>
                                        {user.firstName} {user.lastName}
                                    </Link>
                                </li>
                            ))}
                            {noSuggestionsMessage && <li className="list-group-item">{noSuggestionsMessage}</li>}
                        </ul>
                    )}
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered" id="datatablesSimple">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/admin/updateUser/${user._id}`} className="btn btn-primary btn-sm">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;
