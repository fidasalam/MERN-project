import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import AdminRoutes from './routes/AdminRoute';
import UserRoutes from './routes/UserRoute';
import './App.css'; 

const App = () => {
  return (
    <Provider store={store}>
         <BrowserRouter>
      <Routes>
      <Route path="/admin/*" element={<AdminRoutes/>}/>
      <Route path="/*" element={<UserRoutes/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
