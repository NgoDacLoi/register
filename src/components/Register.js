import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";
import React, { useState} from "react";

export default function Register(){
    const { register, handleSubmit, formState: { errors } } = useForm({mode: 'onBlur'});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const onSubmit = data => {
        console.log(data);
        const username=data.username;
        const email=data.email;
        const password=data.password;
        AuthService.register(username, email, password).then(
            (response)=> {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
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
                {!successful && (
                <div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                        type="text"
                        className="form-control"
                        {...register("username",{
                            minLength:{
                                value: 5,
                                message:"The username must be between 5 and 20 characters"
                            },
                            maxLength:{
                                value: 20,
                                message:"The username must be between 5 and 20 characters"
                            },
                            required:"Username is required"
                        })}
                        />
                        {errors.username && (<small className="text-danger">{errors.username.message}</small>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        type="text"
                        className="form-control"
                        name="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern:{
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'This is not a valid email.'
                            }
                        })}
                        />

                        {errors.email && (<small className="text-danger">{errors.email.message}</small>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        name="password"
                        {...register("password",{
                            minLength:{
                                value: 6,
                                message:"The password must be between 3 and 30 characters"
                            },
                            maxLength:{
                                value: 30,
                                message:"The password must be between 3 and 30 characters"
                            },
                            required:"password is required"
                        })}
                        />
                        {errors.password && (<small className="text-danger">{errors.password.message}</small>)}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" >Sign Up</button>
                    </div>
                </div>
                )}
                
                {message && (
                <div className="form-group">
                    <div
                    className={
                        successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                    >
                    {message}
                    </div>
                </div>
                )}   
            </form>
            </div>
        </div>
    )
}
