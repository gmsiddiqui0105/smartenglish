import React from "react";
import LoginForm from "../components/core/Auth/LoginForm";
import Loader from "../components/common/Loader";

const Login = () => {
    return (
        <div>

            <LoginForm />
            <Loader />

        </div>
    )
}


export default Login;