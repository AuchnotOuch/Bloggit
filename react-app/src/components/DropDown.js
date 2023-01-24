import React from "react";
import LogoutButton from "./auth/LogoutButton";
import './styles/NavBar.css'

const DropDown = () => {
    return (
        <div className="dropdown-container">
            <div className="menu-header">
                <p style={{ textDecoration: 'underline' }}>Account</p>
                <LogoutButton />
            </div>
        </div>
    )
}

export default DropDown
