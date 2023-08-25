import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../../Components/Layouts/Header";
import {useNavigate} from "react-router-dom";

function ProfilePage() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    if (!token) {
        navigate('/');
    }

    useEffect(() => {
        fetchUser();

        if (!token) {
            navigate('/');
        }
    }, [token]);

    const fetchUser = () => {
        axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => {
                setUser(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                // console.error("Error fetching user data:", error);
                setError(error);
                setIsLoading(false);
            });
    };


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching user data</p>;
    }

    return (

        <div className="container">
            <Header/>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>Profile</h3>
                        </div>
                        <div className="card-body">
                            <div className="">
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                {/*Display other user details*/}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
