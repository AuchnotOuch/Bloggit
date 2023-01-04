import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import NewPostBar from "../newPostBar/NewPostBar";
import DeletePost from "../posts/Delete";
import EditPost from "../posts/Edit";
import '../landing/Landing.css'
import { actionClearComments, thunkGetAllComments } from "../../store/comments";
import NewComment from "../comments/newComment";
import Comments from "../comments/comments";
import Post from "../posts/Post";

const Dashboard = () => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    console.log(comments)

    const [mountDelete, setMountDelete] = useState(false)
    const [mountEdit, setMountEdit] = useState(false)
    const [mountComments, setMountComments] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [postId, setPostId] = useState(null)
    const [commentPost, setCommentPost] = useState(null)
    // const [postComments, setPostComments] = useState({})

    // console.log(postComments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    useEffect(() => {

    })

    const mountDeleteModal = (postId) => {
        console.log(postId)
        setDeleteId(postId)
        setMountDelete(!mountDelete)
    }

    const mountEditModal = (postId) => {
        setEditId(postId)
        setMountEdit(!mountEdit)
    }

    const mountCommentSection = (postId) => {
        // e.stopPropagation()
        if (mountComments) {
            dispatch(actionClearComments())
            // setPostComments({})
            setMountComments(!mountComments)
            return
        }

        dispatch(thunkGetAllComments(postId))
        // setPostComments(comments)
        setMountComments(!mountComments)
        return
    }

    return (
        <>
            <div className="container">
                <div className='feed-container'>
                    <div className='feed'>
                        <NewPostBar />
                        <div className="feed-header">
                            <h2>Feed</h2>
                        </div>
                        {mountDelete && <DeletePost deleteId={deleteId} mountDelete={mountDelete} setMountDelete={setMountDelete} />}
                        {mountEdit && <EditPost editId={editId} mountEdit={mountEdit} setMountEdit={setMountEdit} />}
                        {Object.values(posts).reverse().map(post => (
                            <Post post={post} user={user} mountDeleteModal={mountDeleteModal} mountEditModal={mountEditModal} />
                        ))}
                    </div>
                    <div className='side-section'>Side Section</div>
                </div>
            </div>
        </>

    )
}

export default Dashboard
