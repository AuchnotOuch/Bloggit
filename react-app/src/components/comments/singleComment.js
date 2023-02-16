import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteComment } from "../../store/comments";
import EditComment from "./EditComment";
import "../landing/Landing.css"

const SingleComment = ({ comment }) => {
    const user = useSelector(state => state.session.user)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeleteComment(comment.id))
    }

    return (
        <>
            {editMode
                ? <EditComment comment={comment} editMode={editMode} setEditMode={setEditMode} />

                : <div className="comment-section">
                    <div className="commentor-pic">
                        <img alt='profile pic' src={`${comment.user.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
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
