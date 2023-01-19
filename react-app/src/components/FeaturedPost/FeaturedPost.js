import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllPosts } from "../../store/posts";


const FeaturedPost = () => {
    const posts = useSelector(state => state.posts)
    const [featuredPost, setFeaturedPost] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    useEffect(() => {
        let postsArr = []
        Object.values(posts).forEach(post => postsArr.push(post))
        const randomPost = postsArr[Math.floor(Math.random() * (postsArr.length))]
        setFeaturedPost(randomPost)
    }, [posts])


    if (!featuredPost) return null
    if (!featuredPost.photos) return null
    return (
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
    )
}

export default FeaturedPost
