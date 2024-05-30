import axios from "axios";
import React, { useState } from "react";



const SignupForm = () => {

    

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { name, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData, [e.target.name]: e.target.value
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const signupData = {
            ...formData
        }

        axios("/http://localhost:8000/sendotp", {
            signupData
        })
    }




    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 100 }}>

            <form onSubmit={handleSubmit}>
                <div>
                    <label> Name </label>
                    <input name="name" value={name} type="text" onChange={handleChange} />
                </div>
                <div>
                    <label> Email </label>
                    <input name="email" value={email} type="email" id="email" onChange={handleChange} />
                </div>
                <div>
                    <label> Password </label>
                    <input name="password" value={password} type="password" onChange={handleChange} />
                </div>
                <div>
                    <label> Confirm Password </label>
                    <input name="confirmPassword" value={confirmPassword} type="password" onChange={handleChange} />
                </div>
                <button>Submit</button>
            </form>

        </div>
    )
}


export default SignupForm;