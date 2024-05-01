import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import './App.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <UserPage />
        <AdminPage />
      </Router>
    </Provider>
  );
};

export default App;
