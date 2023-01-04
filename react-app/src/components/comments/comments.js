import React from "react";
import { useSelector } from 'react-redux';
import NewComment from "./newComment";
import "../landing/Landing.css"

const Comments = ({ postId }) => {
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const post = useSelector(state => state.posts[postId])

    return (
        <>
            <NewComment postId={postId} />
            {
                Object.values(comments).reverse().map(comment => (
                    <div className="comment-section">
                        <div className="commentor-pic">
                            <img src={`${comment.user.profile_photo_url}`}></img>
                        </div>
                        <div className="comment-container">
                            <div>{`${comment.user.username}`}</div>
                            <div className="comment-text">{`${comment.comment}`}</div>
                        </div>
                        {comment.user.id === user.id &&
                            <>
                                <div className="edit-delete-buttons">
                                    <button ><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button ><i className="fa-regular fa-trash-can"></i></button>
                                </div>
                            </>
                        }
                    </div>
                ))
            }

        </>
    )
}

export default Comments
