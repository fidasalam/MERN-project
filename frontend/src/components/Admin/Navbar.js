import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'; // import the icons for user and login
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../features/admin/adminActions';
import { selectIsAdminAuthenticated ,selectAdmin} from '../../features/admin/adminSlice';

const Navbar = () => {
    const isAuthenticated = useSelector(selectIsAdminAuthenticated);
    const admin = useSelector(selectAdmin);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(adminLogout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <h1 className="navbar-brand" style={{ fontSize: '2rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Dashboard</h1>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {isAuthenticated ? (
                                <div className="d-flex align-items-center">
                                    <span className="text-white me-2">
                                        <FontAwesomeIcon icon={faUser} className="me-1" /> {admin?.admin?.username || "Admin"}
                                    </span>
                                    <button className="btn btn-primary fs-4" onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                <Link className="btn btn-primary fs-5" to="/admin/adminLogin">
                                   Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
