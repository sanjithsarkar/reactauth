import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
// import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = {email, password};

        axios.post('http://127.0.0.1:8000/api/login', userData)
            .then((res) => {
                if (res.data.success) {
                    setIsSubmitting(true);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('name', res.data.name);
                    clearFields();
                    navigate('/dashboard');
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                setIsSubmitting(false);
            })
    }

    return (

        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card mt-5">
                    <div className="card-header">
                        <h3 className="text-center">Login</h3>
                    </div>

                    {message && (<span className="d-flex justify-content-center mt-4">
                        <span className="alert alert-danger text-dark">
                            {message}
                        </span>
                    </span>)}


                    <div className="card-body">
                        <form className="form-components" onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" name="email" className="form-control" value={email}
                                       onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email"/>
                                {errors && errors.email && <div className="text-danger">{errors.email[0]}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control"
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       placeholder="Enter Your Password"/>
                                {errors && errors.password &&
                                    <div className="text-danger">{errors.password[0]}</div>}
                            </div>
                            {/*<div className="mb-3">*/}
                            {/*    <button type="submit" className="btn btn-primary">Login</button>*/}
                            {/*</div>*/}
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Logging In...' : 'Login'}
                            </button>
                            <Link className="mx-3 btn btn-success" to={'/register'}>Register</Link>
                            <Link className="mx-3 btn btn-info" to={'/forget'}>Forget Password</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
};

export default Login;
