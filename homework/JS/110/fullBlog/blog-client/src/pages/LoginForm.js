import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../helpers/useForm";
import '../styles/signup.css';

export default function Form() {
    const [formData, setFormData] = useForm({ username: '', email: '', password: '' });
    const [userData, setUserData] = useForm({ username: '', password: '' });
    const [password2, setpassword2] = useState("");

    const [eye, seteye] = useState(true);
    const [inputtext, set_inputtext] = useState("password");
    const [warning, setwarning] = useState(false);
    const [eye2, seteye2] = useState(true);
    const [inputtext2, set_inputtext2] = useState("password");
    const [warning2, setwarning2] = useState(false);

    const [loggingIn, setloggingIn] = useState(false);

    const [warning_email, set_warningemail] = useState(false);
    const [warning_name, set_warningname] = useState(false);
    const [warning_password, set_warningpassword] = useState(false);

    const input_password2 = (password_event) => {
        setpassword2(password_event.target.value);
    }

    const Eye = () => {
        if (inputtext === "password") {
            set_inputtext("text");
            seteye(false);
            setwarning(true);
        }
        else {
            set_inputtext("password");
            seteye(true);
            setwarning(false);
        }
    }
    const Eye2 = () => {
        if (inputtext2 === "password") {
            set_inputtext2("text");
            seteye2(false);
            setwarning2(true);
        }
        else {
            set_inputtext2("password");
            seteye2(true);
            setwarning2(false);
        }
    }

    const navigate = useNavigate();

    const Started = (e) => {
        e.preventDefault();
        set_warningemail(false);
        set_warningname(false);
        set_warningpassword(false);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (formData.username === "") {
            set_warningname(true);
        }
        else if (!loggingIn && !regex.test(formData.email)) {
            set_warningemail(true);
        }
        else if (formData.password === "" || (!loggingIn && formData.password !== password2)) {
            set_warningpassword(true);
        }
        else {
            if (loggingIn) {
                login();
            } else {
                register();
                login();
            }
            navigate('/');
            alert("form submitted");
        }
    }

    const loginFormBtn = (e) => {
        e.preventDefault();
        setloggingIn(!loggingIn);
    }

    const register = async () => {
        try {
            const response = await fetch('/authentication/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const login = async () => {
        try {
            const response = await fetch('/authentication/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const signin = loggingIn ? (<div className="bottom_div">
        <div className="text">
            <h3>Login</h3>
            <h6>in order to post or to save your preferences</h6>
        </div>

        <div className="input_text">
            <input type="text"
                className={`${warning_name ? "input_warning" : ""}`}
                value={userData.username}
                onChange={setUserData}
                name="username"
                required />
            <label>Username</label>
            <span>{warning_name}</span>
        </div>
        <div className="input_text">
            <input type={inputtext}
                className={`${warning ? "warning" : ""} ${warning_password ? "input_warning" : ""}`}
                value={userData.password}
                onChange={setUserData}
                name="password"
                required />
            <label>Password</label>
            <span>{warning_password}</span>
            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
        </div>
        <div className="button">
            <button onClick={e => Started(e)}>Login</button>
            <a id="foot" href="/forgot">Forgot password</a>
        </div>
    </div>) : (
        <div className="bottom_div">
            <div className="text">
                <h3>Signup</h3>
                <h6>in order to post or to save your preferences</h6>
            </div>

            <div className="input_text">
                <input type="text"
                    className={`${warning_name ? "input_warning" : ""}`}
                    value={formData.username}
                    onChange={setFormData}
                    name="username"
                    required />
                <label>Username</label>
                <span>{warning_name}</span>
            </div>
            <div className="input_text">
                <input type="text" 
                className={`${warning_email ? "input_warning" : ""}`} 
                value={formData.email} 
                onChange={setFormData} 
                name="email" 
                required />
                <label>Email</label>
                <span>{warning_email}</span>
            </div>

            <div className="input_text">
                <input type={inputtext}
                    className={`${warning ? "warning" : ""} ${warning_password ? "input_warning" : ""}`}
                    value={formData.password}
                    onChange={setFormData}
                    name="password"
                    required />
                <label>Password</label>
                <span>{warning_password}</span>
                <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
            </div>
            <div className="input_text">
                <input type={inputtext2}
                    className={`${warning2 ? "warning" : ""} ${warning_password ? "input_warning" : ""}`}
                    value={password2}
                    onChange={input_password2}
                    required />
                <label>Repeat Password</label>
                <span>{warning_password}</span>
                <i onClick={Eye2} className={`fa ${eye2 ? "fa-eye-slash" : "fa-eye"}`}></i>
            </div>
            <div className="button">
                <button onClick={e => Started(e)}>Get Started</button>
                <h6>By signing up you are agreeing to our </h6>
                <a id="foot" href="/terms">Terms and Conditions</a>
            </div>
        </div>
    );

    const logginInBtn = !loggingIn ? (
        <p>Have an account?
            <button id="loginBtn" onClick={e => loginFormBtn(e)}>Log in</button>
        </p>
    ) : (
        <p>Don't have an account?
            <button id="loginBtn" onClick={e => loginFormBtn(e)}>Sign up</button>
        </p>
    );


    return (
        <form id="form">
            <div className="container">
                <div className="main-container">
                    <div className="top_div">
                        <div className="bric">
                            <span></span>
                            <h5>Blog</h5>
                        </div>
                        {logginInBtn}
                    </div>
                    {signin}
                </div>
            </div>
        </form>
    );
}