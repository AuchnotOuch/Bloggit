import React, { useState } from "react";
import { useSelector } from 'react-redux';
import NewComment from "./newComment";
import "../landing/Landing.css"
import SingleComment from "./singleComment";

const Comments = ({ postId }) => {
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    // const post = useSelector(state => state.posts[postId])

    const [editMode, setEditMode] = useState(false)

    return (
        <>
            <NewComment postId={postId} />
            {
                Object.values(comments).reverse().map(comment => (
                    <SingleComment comment={comment} />
                ))
            }

        </>
    )
}

export default Comments
