import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../Components/Layouts/Header";
const Homepage = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className="container">
            <Header />
            <p>Welcome! You are logged in.</p>
        </div>
)
    ;
};

export default Homepage;