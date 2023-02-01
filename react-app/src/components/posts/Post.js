import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../comments/comments";
import { actionClearComments, thunkGetAllComments } from "../../store/comments";


const Post = ({ post, user, mountDeleteModal, mountEditModal }) => {
    const [mountComments, setMountComments] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(null)
    const [following, setFollowing] = useState(false)
    const currentUser = useSelector(state => state.session.user)


    const mountCommentSection = () => {
        if (mountComments) {
            setMountComments(!mountComments)
            return
        }
        setMountComments(!mountComments)
    }

    const addLike = async () => {
        const response = await fetch(`/api/likes/post/${post.id}`, {
            method: 'POST'
        })
        const data = await response.json()
        if (data.Error) {
            return
        }
        setLiked(true)
    }

    const removeLike = async () => {
        const response = await fetch(`/api/likes/post/${post.id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        if (data.Error) {
            return
        }
        setLiked(false)
    }

    useEffect(() => {

        async function getFollowings() {
            const response = await fetch(`/api/users/${currentUser.id}/following`, {
                method: 'GET'
            })
            const data = await response.json()
            Object.values(data).forEach(follow => {
                if (follow.id === post.owner_id) {
                    setFollowing(true)
                }
            })
        }
        getFollowings()

    }, [user, post.owner_id])

    const follow = async () => {
        const response = await fetch(`/api/users/${post.owner_id}/follow`, {
            method: 'POST'
        })
        if (response.ok) {
            setFollowing(true)
        }
    }

    const unfollow = async () => {
        const response = await fetch(`/api/users/${post.owner_id}/unfollow`, {
            method: 'DELETE'
        })
        if (response.ok) {
            setFollowing(false)
        }
    }


    useEffect(() => {
        const getLikes = async () => {
            const response = await fetch(`/api/likes/post/${post.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            if (data.Error) {
                return
            }
            setLikes(data.Likes)
        }
        getLikes()
    }, [liked, post.id])

    useEffect(() => {
        const getLike = async () => {
            const response = await fetch(`/api/likes/post/${post.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            if (data.Error) {
                return
            }
            if (data.User_liked) {
                setLiked(true)
            }
        }
        getLike()
    }, [user, post.id])

    return (
        <div className='post-container'>
            <div className='feed-profile-photo' >
                <img src={`${post.owner.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
            </div>
            <div className='post-header'>
                <div className="header-section">
                    <div className="owner-header">{post.owner.username}</div>
                    {post.owner_id !== currentUser.id &&
                        <div>
                            {following
                                ? <button id="unfollow" onClick={unfollow}>Unfollow</button>
                                : <button id="follow" onClick={follow}>Follow</button>
                            }
                        </div>

                    }
                    {/* <Link to={`/${post.owner.username}/post/${post.id}`} mountDeleteModal={mountDeleteModal} mountEditModal={mountEditModal}>{post.owner.username}</Link> */}
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
                            <div className="photo-content">{post.content}</div>
                        </>
                    }
                    {post.owner.id === currentUser.id &&
                        <>
                            <div className="edit-delete-buttons">
                                <button onClick={() => mountEditModal(post.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button onClick={() => mountDeleteModal(post.id)}><i className="fa-regular fa-trash-can"></i></button>
                            </div>
                        </>
                    }
                    <div className="post-footer">
                        <div>{post.comments.length + likes} notes</div>
                        <div className="comment-like-container">
                            <button id="comment-button" onClick={() => liked ? removeLike() : addLike()}>{liked ? <i id="liked-heart" className="fa-solid fa-heart"></i> : <i id="unliked-heart" className="fa-regular fa-heart"></i>}</button>
                            <button id="comment-button" onClick={(e) => { e.stopPropagation(); mountCommentSection(post.id) }}><i className="fa-regular fa-comment"></i></button>
                        </div>
                    </div>
                    {mountComments &&
                        <div>
                            <Comments postId={post.id} />
                        </div>
                    }

                </div>
            </div>
        </div>

    )
}

export default Post
