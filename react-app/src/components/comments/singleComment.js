import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateComment, thunkGetAllComments, thunkDeleteComment, actionClearComments } from "../../store/comments";
import "../landing/Landing.css"

const SingleComment = ({ comment }) => {
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)

    // const post = useSelector(state => state.posts[postId])

    const [editMode, setEditMode] = useState(false)
    const [editComment, setEditComment] = useState(comment.comment)
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const errorArr = []

        if (editComment.length > 255) {
            errorArr.push('Comment must be 255 characters or less')
        }
        if (editComment.length < 1) {
            errorArr.push("Must provide a comment")
        }

        setErrors(errorArr)
    }, [editComment])


    const handleSubmit = (e) => {
        e.preventDefault()

        const newComment = {
            commentId: comment.id,
            comment: editComment
        }

        dispatch(thunkUpdateComment(newComment))
        setEditMode(!editMode)
        dispatch(thunkGetAllComments(comment.post_id))
    }

    const handleDelete = () => {
        dispatch(thunkDeleteComment(comment.id))
        // dispatch(actionClearComments())
        // dispatch(thunkGetAllComments(comment.post_id))
    }
    return (
        <>
            {editMode
                ? <div className="comment-section">
                    <div className="commentor-pic">
                        <img src={`${comment.user.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                    </div>
                    <div className="comment-container">
                        <div>{`${comment.user.username}`}</div>
                        <form onSubmit={handleSubmit}>
                            <div id="edit-comment-input-submit">
                                <textarea
                                    type='text'
                                    value={editComment}
                                    onChange={e => setEditComment(e.target.value)}
                                    placeholder="Say something nice about this post..."
                                    id="edit-text-comment-input"
                                />
                                <button type="submit" disabled={!!errors.length} id="add-comment-button">Save</button>
                                <button id="edit-add-comment-button">Cancel</button>

                            </div>
                            <ul>
                                {errors.map(error => <li id="error" key={error}>{error}</li>)}
                            </ul>
                        </form>
                    </div>
                </div>

                : <div className="comment-section">
                    <div className="commentor-pic">
                        <img src={`${comment.user.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                    </div>
                    <div className="comment-container">
                        <div>{`${comment.user.username}`}</div>
                        <div className="comment-text">{`${comment.comment}`}</div>
                    </div>
                    {comment.user.id === user.id &&
                        <>
                            <div className="edit-delete-buttons">
                                <button onClick={() => setEditMode(!editMode)}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button onClick={() => handleDelete()}><i className="fa-regular fa-trash-can"></i></button>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default SingleComment
