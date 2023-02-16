import React from "react";
import { useDispatch } from 'react-redux';
import { thunkDeletePost } from "../../store/posts";
import "../landing/Landing.css"


const DeletePost = ({ blur, setBlur, deleteId, mountDelete, setMountDelete }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeletePost(deleteId))
        setMountDelete(!mountDelete)
        setBlur(!blur)
        // dispatch(thunkGetAllPosts())
    }
    return (
        <>
            <div className="delete-modal">
                <p>Are you sure you want to delete this post?</p>
                <div className="delete-message">
                    <span><button id='cancel-delete' onClick={() => { setBlur(!blur); setMountDelete(!mountDelete) }}>No</button></span>
                    <span><button id='submit-delete' onClick={() => handleDelete()}>Yes</button></span>
                </div>
            </div>
        </>
    )

}

export default DeletePost
