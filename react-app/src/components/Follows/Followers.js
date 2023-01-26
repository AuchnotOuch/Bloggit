import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowerCard from "./FollowerCard";
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
    if (!userId) return null
    if (!followers) return null
    return (
        <>
            <div className="container">
                <div className="followers">
                    <h2>{Object.keys(followers).length} Followers</h2>
                    <div className="followers-container">
                        {Object.values(followers).map(follower =>
                            <FollowerCard follower={follower} key={follower.id} />
                        )}
                    </div>
                </div>
                <div className="side-section">side section</div>
            </div>
        </>
    )
}

export default Followers
