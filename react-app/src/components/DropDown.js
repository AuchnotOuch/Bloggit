import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";
import './styles/NavBar.css'

const DropDown = () => {
    const user = useSelector(state => state.session.user)
    const [followers, setFollowers] = useState(null)
    const [following, setFollowing] = useState(null)

    useEffect(() => {
        async function getFollowers() {
            const response = await fetch(`/api/users/${user.id}/followers`, {
                method: 'GET'
            })
            const data = await response.json()
            setFollowers(Object.keys(data).length)
        }
        async function getFollowings() {
            const response = await fetch(`/api/users/${user.id}/following`, {
                method: 'GET'
            })
            const data = await response.json()
            setFollowing(Object.keys(data).length)
        }
        getFollowers()
        getFollowings()
    }, [user])

    return (
        <div className="dropdown-container">
            <div className="menu-header">
                <p>Account</p>
                <LogoutButton />
            </div>
            <div className="menu-items-container">
                <div className="menu-posts-container">
                    <div className="menu-posts">
                        <i className="fa-solid fa-file-pen menu-posts-icon"></i>
                        <p>Posts</p>
                    </div>
                    <div>{user.posts}</div>
                </div>
                <div className="menu-likes-container">
                    <div className="menu-likes">
                        <i className="fa-solid fa-heart menu-like-icon"></i>
                        <p>Likes</p>
                    </div>
                    <div>{user.likes}</div>
                </div>
                <div className="menu-following-container">
                    <div className="menu-following">
                        <i className="fa-solid fa-user-group menu-following-icon"></i>
                        <p>Following</p>
                    </div>
                    <div>{following}</div>
                </div>
                <div className="menu-followers-container">
                    <div className="menu-followers">
                        <i className="fa-solid fa-user-plus menu-followers-icon"></i>
                        <p>Followers</p>
                    </div>
                    <div>{followers}</div>
                </div>
            </div>
        </div>
    )
}

export default DropDown
