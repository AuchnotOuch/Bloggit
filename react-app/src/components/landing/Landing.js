import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import Post from "../posts/Post";

import './Landing.css'
import Welcome from './Welcome';

const Landing = () => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)
    const [mountWelcome, setMountWelcome] = useState(true)

    const history = useHistory()
    const dispatch = useDispatch()

    let postsArr = []
    Object.values(posts).forEach(post => postsArr.push(post))
    const featuredPost = postsArr[Math.floor(Math.random() * (postsArr.length))]

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (user) {
        history.push('/dashboard')
    }

    if (!featuredPost) return null
    if (!featuredPost.photos) return null
    console.log(featuredPost.photos)

    return (
        <>
            {mountWelcome &&
                <Welcome mountWelcome={mountWelcome} setMountWelcome={setMountWelcome} />
            }
            <div className='feed-container'>
                <div className='feed'>
                    {Object.values(posts).reverse().map(post => (
                        <div className='post-container'>
                            <div className='feed-profile-photo' >
                                <img src={`${post.owner.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
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
                                                        <img src={photo.url} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
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
                    <div className='featured-blogs'>
                        <div className='single-featured-blog'>
                            {featuredPost.type === 'photo' &&
                                <div>
                                    <img id='featured-photo' src={featuredPost.photos[0].url} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"} />
                                </div>
                            }
                            <div id='featured-title'>
                                {featuredPost.title
                                    ? featuredPost.title
                                    : ""
                                }
                            </div>
                            {featuredPost.type === 'quote'
                                ? <div id="featured-quote">"{featuredPost.content}"</div>
                                : <div id="featured-content">{featuredPost.content}</div>}
                            <div id="featured-quote-source">
                                {featuredPost.quote_source
                                    ? "-" + featuredPost.quote_source
                                    : ''
                                }
                            </div>
                        </div>
                        <div className='featured-post-owner-container'>
                            <div>
                                <img id='featured-post-owner' src={featuredPost.owner.profile_photo_url} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"} />
                            </div>
                            <div>
                                - {featuredPost.owner.username}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;
