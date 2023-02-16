import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NewComment from "./newComment";
import "../landing/Landing.css"
import SingleComment from "./singleComment";
import { thunkGetAllComments } from "../../store/comments";

const Comments = ({ postId }) => {
    const comments = useSelector(state => state.comments)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetAllComments(postId))
    }, [postId, dispatch])
    return (
        <>
            <NewComment postId={postId} />
            {
                Object.values(comments).reverse().map(comment => (
                    comment.post_id === postId &&

                    <SingleComment comment={comment} />
                ))
            }

        </>
    )
}

export default Comments
