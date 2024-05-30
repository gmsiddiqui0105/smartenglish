import React, { useState } from "react";
import { Link } from "react-router-dom";

import apple from '../../../assets/apple.png';
import google from '../../../assets/google.png';

import './loginform.css';

const LoginForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleChangeEmail = () => {
        setEmail(e => e.target.value);
    }

    const handleChangePassword = () => {
        setPassword(e => e.target.value);
    }

    const handleLogin = () => {

    }




    return (
        <div className="body">
            <div className="form-wrapper">
                <div className="form-side">
                    <form className="my-form" onSubmit={handleLogin}>
                        <div className="form-welcome-row">
                            <h1>Login! &#128079;</h1>
                            <h2>How do I get started</h2>
                        </div>
                        <div className="socials-row">
                            <Link to={"/"}>
                                <img src={google} alt="Google" />
                                Sign in with Google
                            </Link>
                        </div>
                        <div className="socials-row">
                            <Link className="link" to={'/'}>
                                <img src={apple} alt="Apple" />
                                Sign in with Apple
                            </Link>
                        </div>
                        <div className="divider">
                            <div className="divider-line"></div>
                            or Login with Email
                            <div className="divider-line"></div>
                        </div>
                        <div className="text-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email"
                                placeholder="you@example.com"
                                autoComplete="off"
                                required />
                            <div className="error-message">Email is incorrect</div>

                        </div>
                        <div className="text-field">
                            <label htmlFor="passsword">Password</label>
                            <input type="password" name="password" id="password"
                                placeholder="your password"
                                title="Minimum 6 characters, atleast 1 Alphabet and 1 Number"
                                autoComplete="off"
                                pattern="^(?=.*[A-Za-z])(?.=.*\d)[A-Za-z\d]{6,}$" required
                            />
                            <div className="error-message">Minimum 6 characters ,atleast 1 Alphabet and atleast 1 Number </div>
                        </div>

                        <button className="my-form__button" type="submit">
                            Sign In
                        </button>
                        <div className="my-form__actions">
                            <div className="my-form__row">
                                <span>Don't have an account?</span>
                                <Link to={'/sign-up'}>Sign up Now</Link>
                            </div>
                        </div>
                    </form>
                </div>

                <aside class="info-side">
                    <article class="blockquote-wrapper">
                        <h2>Why should I login?</h2>
                        <p>By logging in, you can access your personal dashboard, where you can manage your account, view your profile, and much more.</p>
                        <img src="assets/dashboard.png" alt="Dashboard" />
                    </article>
                </aside>
            </div>
        </div>
    )
}


export default LoginForm;