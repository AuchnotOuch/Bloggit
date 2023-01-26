import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Follows.css'


const FollowerCard = ({ follower }) => {
    const user = useSelector(state => state.session.user)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        if (user) {
            async function getFollowings() {
                const response = await fetch(`/api/users/${user.id}/following`, {
                    method: 'GET'
                })
                const data = await response.json()
                Object.values(data).forEach(follow => {
                    if (follow.follower_id === follower.id) {
                        return setFollowing(true)
                    }
                })
            }
            getFollowings()
        }
    }, [user])

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
            <div className="follower-img-name-container">
                <img id='follower-img' src={follower.profile_photo_url}></img>
                <div>{follower.username}</div>
            </div>
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
