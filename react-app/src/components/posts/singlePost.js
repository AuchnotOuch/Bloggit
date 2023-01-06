import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './Posts.css'


const SinglePost = () => {
    const posts = useSelector(state => state.posts)
    const { postId } = useParams()

    const post = posts[postId]

    return (
        <div className="single-post-modal">
            <div className="single-post">
                <div className="single-post-header">
                    {post.owner.username}
                </div>
                <div></div>
            </div>
            <div></div>
        </div>
    )
}

export default SinglePost
