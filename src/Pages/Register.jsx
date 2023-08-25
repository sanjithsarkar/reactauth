import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrors({ password: ['Passwords do not match'] });
        } else {
            // Passwords match, clear errors
            setErrors({});

            // Continue with form submission or other actions
        }

        const userData = {name, email, password, confirmPassword};

        axios.post('http://127.0.0.1:8000/api/register', userData)
            .then((res) => {
                if (res.data.success) {
                    setIsSubmitting(true);
                    clearFields();
                    navigate('/');
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
                        <h3 className="text-center">Register</h3>
                    </div>

                    {message && (<span className="d-flex justify-content-center mt-4">
                        <span className="alert alert-danger text-dark">
                            {message}
                        </span>
                    </span>)}


                    <div className="card-body">
                        <form className="form-components" onSubmit={handleRegister}>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" value={name}
                                       onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name"/>
                                {errors && errors.name && <div className="text-danger">{errors.name[0]}</div>}
                            </div>

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

                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm Your Password"
                                />
                                {errors && errors.confirmPassword &&
                                    <div className="text-danger">{errors.confirmPassword[0]}</div>}
                            </div>

                            {/*<div className="mb-3">*/}
                            {/*    <button type="submit" className="btn btn-primary">Login</button>*/}
                            {/*</div>*/}
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Register In...' : 'Register'}
                            </button>
                            <Link className="mx-3 btn btn-success" to={'/'}>Login</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
};

export default Register;
