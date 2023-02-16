import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import FeaturedPost from '../FeaturedPost/FeaturedPost';

import './Landing.css'
import Welcome from './Welcome';

const Landing = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if (user) {
        history.push('/dashboard')
    }
    const posts = useSelector(state => state.posts)
    const [mountWelcome, setMountWelcome] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    return (
        <>
            {mountWelcome &&
                <Welcome mountWelcome={mountWelcome} setMountWelcome={setMountWelcome} />
            }
            <div className='feed-container'>
                <div className='feed'>
                    {Object.values(posts).reverse().map(post => (
                        <div key={post.id} className='post-container'>
                            <div className='feed-profile-photo' >
                                <img alt='profile pic' src={`${post.owner.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                            </div>
                            <div className='post-header'>
                                <div className="header-section">
                                    <div className="owner-header">{post.owner.username}</div>

                                    {/* <Link to={`/${post.owner.username}/post/${post.id}`}>{post.owner.username}</Link> */}
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
                                                <div key={photo.id} className='image-post-container'>
                                                    <div className='post-image'>
                                                        <img alt='post pic' src={photo.url} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
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
                    <FeaturedPost />
                    <div className="about-link-section">
                        <Link to={'/about'} id={'about-button'}>About</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;
