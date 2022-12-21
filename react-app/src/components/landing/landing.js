import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import './Landing.css'
const Landing = () => {
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    return (
        <>
            <h1>Landing</h1>
            <div className='container'>
                <div className='feed'>
                    {Object.values(posts).map(post => (
                        <div className='post-container'>
                            <div className='feed-profile-photo' >
                                <img src={`${post.owner.profile_photo_url}`}></img>
                            </div>
                            <div className='post-header'>
                                <Link to={`/${post.owner.username}/post/${post.id}`}>{post.owner.username}</Link>
                                <div className='post-content'>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='side-section'>Test</div>
            </div>
        </>
    )
}

export default Landing;
