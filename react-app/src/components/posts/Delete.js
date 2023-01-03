import React from "react";
import { useDispatch } from 'react-redux';
import { thunkDeletePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const DeletePost = ({ deleteId, mountDelete, setMountDelete }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(thunkDeletePost(deleteId))
        setMountDelete(!mountDelete)
        // dispatch(thunkGetAllPosts())
    }
    return (
        <>
            <div className="background-blur">
                <div className="delete-modal">
                    <p>Are you sure you want to delete this post?</p>
                    <div>
                        <span><button onClick={() => setMountDelete(!mountDelete)}>No</button></span>
                        <span><button onClick={handleDelete}>Yes</button></span>

                    </div>
                </div>
            </div>
        </>
    )

}

export default DeletePost
