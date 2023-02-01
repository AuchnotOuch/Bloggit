import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../posts/Post";
import './MainProfile.css'


const MainProfile = () => {
    const { userId } = useParams()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async (userId) => {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data)
            }
        }

        const getPosts = async () => {
            const response = await fetch(`/api/posts`, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                setPosts(data.Posts)
            }
        }

        getUser(userId)
        getPosts(userId)
    }, [userId])

    useEffect(() => {
        let postArr = []
        posts.forEach(post => {
            if (post.owner_id === userId) {
                postArr.push(post)
            }
            // console.log(userPosts)
        })
        setUserPosts(postArr)
    }, [posts, userId])

    console.log(userPosts)
    if (!user || !userPosts) return null
    return (
        <div className="container">
            <div className="profile-container">
                <div className="main">
                    main
                    <div className="profile-header">header
                        <div className="profile-pic"><img src={user.profile_photo_url} /></div>
                        <h3 className="blog-name">{user.blog_title}</h3>
                        <div className="blog-description">{user.description}</div>
                        <div className="follow-unfollow">follow/unfollow section</div>
                    </div>
                    <div className="profile-posts">
                        <h2>Posts</h2>
                        <div className="posts-container">
                            {posts.map(post => (
                                <Post post={post} user={user} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="side">side</div>
            </div>
        </div>
    )

}

export default MainProfile
