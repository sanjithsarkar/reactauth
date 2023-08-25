import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Homepage from '../Pages/Homepage';
import Profile from "../Pages/Profile/Profile";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
const AppRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Homepage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/forget' element={<ForgetPassword />} />
                <Route path='/reset' element={<ResetPassword />} />
            </Routes>
        </Router>
    );
};

export default AppRoute;