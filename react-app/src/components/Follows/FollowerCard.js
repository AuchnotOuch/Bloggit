import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Follows.css'


const FollowerCard = ({ follower }) => {
    const user = useSelector(state => state.session.user)
    const [following, setFollowing] = useState(false)

    useEffect(() => {

        async function getFollowings() {
            const response = await fetch(`/api/users/${user.id}/following`, {
                method: 'GET'
            })
            const data = await response.json()
            Object.values(data).forEach(follow => {
                if (follow.id === follower.id) {
                    return setFollowing(true)
                }
            })
        }
        getFollowings()

    }, [user, follower.id])

    const follow = async () => {
        const response = await fetch(`/api/users/${follower.id}/follow`, {
            method: 'POST'
        })
        if (response.ok) {
            setFollowing(true)
        }
    }

    const unfollow = async () => {
        const response = await fetch(`/api/users/${follower.id}/unfollow`, {
            method: 'DELETE'
        })
        if (response.ok) {
            setFollowing(false)
        }
    }

    if (!user) return null
    return (
        <div className="follower">
            <Link to={`/users/${follower.id}`}>
                <div className="follower-img-name-container">
                    <img alt="follower pic" id='follower-img' src={follower.profile_photo_url} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                    <div>{follower.username}</div>
                </div>
            </Link>
            <div>
                {following
                    ? <button id="unfollow" onClick={unfollow}>Unfollow</button>
                    : <button id="follow" onClick={follow}>Follow</button>
                }
            </div>
        </div>
    )
}


export default FollowerCard
