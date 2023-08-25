import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {

    const [pincode, setPincode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const clearFields = () => {
        setPassword('');
        setConfirmPassword('');
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrors({ password: ['Passwords do not match'] });
        } else {
            // Passwords match, clear errors
            setErrors({});

            // Continue with form submission or other actions
        }

        const userData = {email, password, confirmPassword, pincode};

        axios.post('http://127.0.0.1:8000/api/resetpassword', userData)
            .then((res) => {
                setMessage(res.data.message);
                clearFields();
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                console.log(error);
            })

    }
    return (<div className="row justify-content-center">
        <div className="col-md-4">
            <div className="card mt-5">
                <div className="card-header">
                    <h3 className="text-center">Forget Password</h3>
                </div>

                {message && (<span className="d-flex justify-content-center mt-4">
                    <span className="alert alert-success text-dark">
                        {message}
                    </span>
                </span>)}


                <div className="card-body">
                    <form className="form-components" onSubmit={handleResetPassword}>

                        <div className="mb-3">
                            <label className="form-label">Pin Code</label>
                            <input type="text" name="pincode" className="form-control" value={pincode}
                                   onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode"/>
                            {errors && errors.pincode && <div className="text-danger">{errors.pincode[0]}</div>}
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


                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Reset Password...' : 'Reset'}
                        </button>
                        <Link className="mx-3 btn btn-success" to={'/'}>Login</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default ResetPassword;