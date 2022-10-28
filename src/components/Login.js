import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";

import AuthService from "../services/auth.service";

const Login = ()=> {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({mode: 'onBlur'});
    
    const onSubmit = data =>{
        console.log(data)
        const username = data.username;
        const password = data.password;
        setMessage("");
        setLoading(true);

        AuthService.login(username, password).then(
            () => {
                navigate('/profile');
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                    
                setLoading(false);
                setMessage(resMessage);
            }
        )
    }

    return(
        <div className="col-md-12">
            <div className="card card-container">
                <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                        type="text"
                        className="form-control"
                        {...register("username",{
                            required:"This field is required!"
                        })}
                        />
                        {errors.username && (<small className="text-danger">{errors.username.message}</small>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        {...register("password",{
                            required:"This field is required!"
                        })}
                        />
                        {errors.password && (<small className="text-danger">{errors.password.message}</small>)}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login;