import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {

        setLoggedIn(false);
        //localStorage.removeItem('token');
        //localStorage.removeItem('name');
        localStorage.clear();

        // Redirect to the login page
        navigate('/');
    };
    return (

        <section id="header">
            <nav className="navbar navbar-expand-lg bg-body-secondary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/profile'} className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
);
};

export default Header;