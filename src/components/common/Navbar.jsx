import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";


const Navbar = () => {



    return (

        <div className="container">
            <div className="navbar">

                <div className="nav-left">
                    <NavLink to={"/"}><h1>S.B. Computer Labs</h1></NavLink>
                </div>

                <div className="nav-right">
                    <ul className="nav-list">
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/login"}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/signup"}>Register</NavLink>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    )
}



export default Navbar;