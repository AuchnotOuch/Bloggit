import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './MainProfile.css'


const MainProfile = ({ blur, setBlur, profileId, mountProfile, setMountProfile }) => {
    const posts = useSelector(state => state.posts)
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        let postArr = []
        Object.values(posts).forEach(post => {
            if (post.owner_id === profileId) {
                postArr.push(post)
            }
            return setUserPosts(postArr)
        })
    }, [posts])
    console.log(userPosts)
    return (
        <div className="profile-container">
            <div className="main">
                main
                <div className="profile-header">header
                    <div className="profile-pic">profile pic</div>
                    <div className="blog-name">blog name</div>
                    <div className="blog-description">blog description</div>
                    <div className="follow-unfollow">follow/unfollow section</div>
                </div>
                <div className="profile-posts">
                    <h2>Posts</h2>

                </div>
            </div>
            <div className="side">side</div>
        </div>
    )

}

export default MainProfile
