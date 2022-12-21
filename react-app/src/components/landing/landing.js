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
                                    {post.type === 'text' &&
                                        <>
                                            <div className='title'>{post.title}</div>
                                            <div className='content'>{post.content}</div>
                                        </>
                                    }
                                    {post.type === 'quote' &&
                                        <>
                                            <div className='quote-body'>"{post.content}"</div>
                                            <div className='quote-source'>- {post.quote_source}</div>
                                        </>
                                    }
                                    {/* to do: add photo type to post content and research ways to add link previews */}
                                    {/* {post.type === 'photo' &&

                                    } */}
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
