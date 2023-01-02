import React from "react";
import { useDispatch } from 'react-redux';
import { thunkDeletePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const DeletePost = ({ deleteId, mountDelete, setMountDelete }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeletePost(deleteId))
        setMountDelete(!mountDelete)
        dispatch(thunkGetAllPosts())
    }
    return (
        <>
            <div className="delete-modal">
                <p>Are you sure you want to delete this post?</p>
                <button onClick={() => setMountDelete(!mountDelete)}>No</button>
                <button onClick={handleDelete}>Yes</button>
            </div>
        </>
    )

}

export default DeletePost
