import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'; // Added faUser icon
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../features/admin/adminSlice';

const Sidebar = () => {
    const admin = useSelector(selectAdmin);

    return (
        <nav className="sb-sidenav accordion bg-dark" id="sidenavAccordion" style={{ width: "200px", minHeight: "250vh" }}>
            <div className="sb-sidenav-menu">
                <div className="nav flex-column">
                    
                    <Link to="/admin/userList" className="nav-link text-white mt-5">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faList} /></div>
                        User List
                    </Link>
                    <Link to="/admin/addUser" className="nav-link text-white">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUserPlus} /></div>
                        Add User
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
