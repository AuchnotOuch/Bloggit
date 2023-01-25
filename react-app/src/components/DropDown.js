import React from "react";
import LogoutButton from "./auth/LogoutButton";
import './styles/NavBar.css'

const DropDown = () => {
    return (
        <div className="dropdown-container">
            <div className="menu-header">
                <p>Account</p>
                <LogoutButton />
            </div>
            <div className="menu-items-container">
                <div className="menu-likes-container">
                    <div className="menu-likes">
                        <i className="fa-solid fa-heart menu-like-icon"></i>
                        <p>Likes</p>
                    </div>
                    <div>1</div>
                </div>
                <div className="menu-following-container">
                    <div className="menu-following">
                        <i className="fa-solid fa-user-group menu-following-icon"></i>
                        <p>Following</p>
                    </div>
                    <div>1</div>
                </div>
                <div className="menu-followers-container">
                    <div className="menu-followers">
                        <i className="fa-solid fa-user-plus menu-followers-icon"></i>
                        <p>Followers</p>
                    </div>
                    <div>1</div>
                </div>
            </div>
        </div>
    )
}

export default DropDown
