import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../comments/comments";
import { actionClearComments, thunkGetAllComments } from "../../store/comments";


const Post = ({ post, user, mountDeleteModal, mountEditModal }) => {
    const [mountComments, setMountComments] = useState(false)
    const dispatch = useDispatch()

    const mountCommentSection = (postId) => {
        if (mountComments) {
            dispatch(actionClearComments())
            dispatch(thunkGetAllComments(postId))
            setMountComments(!mountComments)
            return
        }
        dispatch(actionClearComments())
        dispatch(thunkGetAllComments(postId))
        setMountComments(!mountComments)
    }

    return (
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
                            <div className="photo-content">{post.content}</div>
                        </>
                    }
                    {post.owner.id === user.id &&
                        <>
                            <div className="edit-delete-buttons">
                                <button onClick={() => mountEditModal(post.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button onClick={() => mountDeleteModal(post.id)}><i className="fa-regular fa-trash-can"></i></button>
                            </div>
                        </>
                    }
                    <div className="post-footer">
                        <div>Notes</div>
                        <div className="comment-like-container">
                            <button id="comment-button" onClick={(e) => { e.stopPropagation(); mountCommentSection(post.id) }}><i class="fa-regular fa-comment"></i></button>
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
