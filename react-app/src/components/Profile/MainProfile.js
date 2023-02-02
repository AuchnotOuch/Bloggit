import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/posts";
import ProfilePost from "./ProfilePost"
import DeletePost from "../posts/Delete";
import EditPost from "../posts/Edit";
import './MainProfile.css'



const MainProfile = () => {
    const { userId } = useParams()

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [following, setFollowing] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [mountDelete, setMountDelete] = useState(false)
    const [mountEdit, setMountEdit] = useState(false)
    const [blur, setBlur] = useState(false)

    const currentUser = useSelector(state => state.session.user)
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
    }, [userId, mountEdit, mountDelete])

    useEffect(() => {
        const getUserPosts = () => {
            let postArr = []
            posts.forEach(post => {
                if (post.owner_id === parseInt(userId)) {
                    postArr.push(post)
                }
                // console.log(userPosts)
            })
            setUserPosts(postArr)
            console.log(postArr)

        }
        console.log(userPosts)
        getUserPosts()
    }, [posts, userId])

    useEffect(() => {

        async function getFollowings() {
            const response = await fetch(`/api/users/${currentUser.id}/following`, {
                method: 'GET'
            })
            const data = await response.json()
            Object.values(data).forEach(follow => {
                if (follow.id === parseInt(userId)) {
                    setFollowing(true)
                }
            })
        }
        getFollowings()
        console.log(following)

    }, [currentUser, userId])

    const follow = async () => {
        const response = await fetch(`/api/users/${userId}/follow`, {
            method: 'POST'
        })
        if (response.ok) {
            setFollowing(true)
        }
    }

    const unfollow = async () => {
        const response = await fetch(`/api/users/${userId}/unfollow`, {
            method: 'DELETE'
        })
        if (response.ok) {
            setFollowing(false)
        }
    }

    const mountDeleteModal = (postId) => {
        setBlur(!blur)
        setDeleteId(postId)
        setMountDelete(!mountDelete)
    }

    const mountEditModal = (postId) => {
        setBlur(!blur)
        console.log(postId)
        setEditId(postId)
        setMountEdit(!mountEdit)
    }

    useEffect(() => dispatch(thunkGetAllPosts()))

    if (!user || !userPosts) return null
    return (
        <div className="container">
            <div className="profile-container">
                <div className="main">
                    {mountDelete && <DeletePost blur={blur} setBlur={setBlur} deleteId={deleteId} mountDelete={mountDelete} setMountDelete={setMountDelete} />}
                    {mountEdit && <EditPost blur={blur} setBlur={setBlur} editId={editId} mountEdit={mountEdit} setMountEdit={setMountEdit} />}
                    <div className="profile-header">
                        <div className="profile-pic"><img src={user.profile_photo_url} /></div>
                        <h3 className="blog-name">{user.blog_title}</h3>
                        <div className="blog-description">{user.description}</div>
                        {parseInt(userId) !== currentUser.id &&
                            <div className="follow-unfollow">
                                {following
                                    ? <button id="profile-unfollow" onClick={unfollow}>Unfollow</button>
                                    : <button id="profile-follow" onClick={follow}>Follow</button>
                                }
                            </div>
                        }
                    </div>
                    <div className="profile-posts">
                        <h2>Posts</h2>
                        <div className="posts-container">
                            {userPosts.map(post => (
                                <ProfilePost post={post} user={currentUser} mountDeleteModal={mountDeleteModal} mountEditModal={mountEditModal} />
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
