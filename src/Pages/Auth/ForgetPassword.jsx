import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const forgetPassword = (e) => {
        e.preventDefault();

        const userData = {email};
        axios.post('http://127.0.0.1:8000/api/forgetpassword', userData)
            .then((res) => {
                setMessage(res.data.message);
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
                    <form className="form-components" onSubmit={forgetPassword}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email"/>
                            {errors && errors.email && <div className="text-danger">{errors.email[0]}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending Email...' : 'Send Mail'}
                        </button>
                        <Link className="mx-3 btn btn-success" to={'/'}>Login</Link>
                        <Link className="mx-3 btn btn-info" to={'/reset'}>Reset</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default ForgetPassword;