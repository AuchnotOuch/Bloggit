import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import './Landing.css'

const Landing = () => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)
    const [users, setUsers] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    useEffect(async () => {
        const response = await fetch('/api/users', {
            method: 'GET'
        })
        if (response.ok) {
            const data = await response.json()
            setUsers(data.users)
        }
        console.log(users)
    }, [])

    if (user) {
        history.push('/dashboard')
    }

    return (
        <>
            <div className='container'></div>
            <div className='feed-container'>
                <div className='feed'>
                    {Object.values(posts).reverse().map(post => (
                        <div className='post-container'>
                            <div className='feed-profile-photo' >
                                <img src={`${post.owner.profile_photo_url}`}></img>
                            </div>
                            <div className='post-header'>
                                <div className="header-section">
                                    <Link to={`/${post.owner.username}/post/${post.id}`}>{post.owner.username}</Link>
                                </div>
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
                                    {/* to do: research ways to add link previews */}
                                    {post.type === 'photo' &&
                                        <>
                                            {Object.values(post.photos).map(photo => (
                                                <div className='image-post-container'>
                                                    <div className='post-image'>
                                                        <img src={photo.url}></img>
                                                    </div>
                                                    <div className='post-image-caption'>{photo.text}</div>
                                                </div>
                                            ))}
                                            <div className='photo-content'>{post.content}</div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='side-section'>
                    <h2>Radar</h2>
                    <hr></hr>
                    <div className='featured-blogs'>
                        <div>test</div>
                        {users && users.forEach(user => {
                            <div className='single-featured-blog'>
                                <img src={`${user.profile_photo_url}`} />
                                <div>test</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;
