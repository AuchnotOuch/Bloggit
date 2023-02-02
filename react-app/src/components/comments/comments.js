import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NewComment from "./newComment";
import "../landing/Landing.css"
import SingleComment from "./singleComment";
import { thunkGetAllComments } from "../../store/comments";

const Comments = ({ postId }) => {
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const post = useSelector(state => state.posts[postId])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetAllComments(postId))
    }, [postId])
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
