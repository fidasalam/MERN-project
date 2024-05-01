import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
