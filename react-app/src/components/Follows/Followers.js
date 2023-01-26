import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './Follows.css'


const Followers = () => {
    const user = useSelector(state => state.session.user)
    const { userId } = useParams()
    const [followers, setFollowers] = useState({})

    useEffect(() => {
        async function getFollowers() {
            const response = await fetch(`/api/users/${userId}/followers`, {
                method: 'GET'
            })
            const data = await response.json()
            setFollowers(data)
        }
        getFollowers()
    }, [userId])

    return (
        <>
            <div className="followers-container">
                <div className="followers">test</div>
                <div className="side-section">side section</div>
            </div>
        </>
    )
}

export default Followers
