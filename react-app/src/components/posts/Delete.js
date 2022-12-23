import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const DeletePost = ({ post, mountDelete, setMountDelete }) => {

    return (
        <>
            <div className="delete-modal">
                <p>Are you sure you want to delete this post?</p>
                <button onClick={() => setMountDelete(!mountDelete)}>No</button>
                <button>Yes</button>
            </div>
        </>
    )

}

export default DeletePost
