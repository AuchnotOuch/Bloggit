import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import NewPostBar from "../newPostBar/NewPostBar";
import DeletePost from "../posts/Delete";
import EditPost from "../posts/Edit";
import Post from "../posts/Post";
import FeaturedPost from "../FeaturedPost/FeaturedPost";
import MainProfile from "../Profile/MainProfile"
import '../landing/Landing.css'

const Dashboard = () => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)

    const [mountProfile, setMountProfile] = useState(true)
    const [mountDelete, setMountDelete] = useState(false)
    const [mountEdit, setMountEdit] = useState(false)
    const [profileId, setProfileId] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [blur, setBlur] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    const mountDeleteModal = (postId) => {
        setBlur(!blur)
        setDeleteId(postId)
        setMountDelete(!mountDelete)
    }

    const mountEditModal = (postId) => {
        setBlur(!blur)
        setEditId(postId)
        setMountEdit(!mountEdit)
    }

    const mountProfileModal = (userId) => {
        setBlur(!blur)
        setProfileId(userId)
        setMountProfile(!mountProfile)
    }
    return (
        <>
            {blur &&
                <div className="background-blur"></div>
            }
            <div className="container">
                <div className='feed-container'>
                    <div className='feed'>
                        <NewPostBar />
                        <div className="feed-header">
                            <h2>Feed</h2>
                        </div>
                        {mountDelete && <DeletePost blur={blur} setBlur={setBlur} deleteId={deleteId} mountDelete={mountDelete} setMountDelete={setMountDelete} />}
                        {mountEdit && <EditPost blur={blur} setBlur={setBlur} editId={editId} mountEdit={mountEdit} setMountEdit={setMountEdit} />}
                        {mountProfile && <MainProfile blur={blur} setBlur={setBlur} profileId={profileId} mountProfile={mountProfile} setMountProfile={setMountProfile} />}
                        {Object.values(posts).reverse().map(post => (
                            <Post post={post} user={user} mountDeleteModal={mountDeleteModal} mountEditModal={mountEditModal} />
                        ))}
                    </div>
                    <div className='side-section'>
                        <h2>Radar</h2>
                        <FeaturedPost />
                        <div className="about-link-section">
                            <Link to={'/about'} id={'about-button'}>About</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard
