import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import FeaturedPost from "../FeaturedPost/FeaturedPost";
import FollowerCard from "./FollowerCard";
import './Follows.css'


const Followings = () => {
    const user = useSelector(state => state.session.user)
    const { userId } = useParams()
    const [followings, setFollowings] = useState({})

    useEffect(() => {
        async function getFollowings() {
            const response = await fetch(`/api/users/${userId}/following`, {
                method: 'GET'
            })
            const data = await response.json()
            setFollowings(data)
        }
        getFollowings()
    }, [userId])

    if (!userId) return null
    if (!followings) return null
    return (
        <>
            <div className="main-followers-container">
                <div className="followers">
                    <h2>You follow {Object.keys(followings).length} blogs</h2>
                    <div className="followers-container">
                        {Object.values(followings).map(follower =>
                            <FollowerCard follower={follower} key={follower.id} />
                        )}
                    </div>
                </div>
                <div className='side-section'>
                    <h2>Radar</h2>
                    <FeaturedPost />
                    <div className="about-link-section">
                        <Link to={'/about'} id={'about-button'}>About</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Followings
