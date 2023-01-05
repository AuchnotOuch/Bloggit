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

    let postsArr = []
    Object.values(posts).forEach(post => postsArr.push(post))
    const featuredPost = postsArr[Math.floor(Math.random() * (postsArr.length))]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    const mountDeleteModal = (postId) => {
        console.log(postId)
        setDeleteId(postId)
        setMountDelete(!mountDelete)
    }

    const mountEditModal = (postId) => {
        setEditId(postId)
        setMountEdit(!mountEdit)
    }
    if (!featuredPost) return null
    if (!featuredPost.photos) return null
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
                    <div className='side-section'>
                        <h2>Radar</h2>
                        <div className='featured-blogs'>
                            <div className='single-featured-blog'>
                                <div id='featured-title'>
                                    {featuredPost.title
                                        ? featuredPost.title
                                        : ""
                                    }
                                </div>
                                {featuredPost.type === 'quote'
                                    ? <div id="featured-quote">"{featuredPost.content}"</div>
                                    : <div id="featured-content">{featuredPost.content}</div>}
                                <div id="featured-quote-source">
                                    {featuredPost.quote_source
                                        ? "-" + featuredPost.quote_source
                                        : ''
                                    }
                                </div>
                            </div>
                            <div className='featured-post-owner-container'>
                                <div>
                                    <img id='featured-post-owner' src={featuredPost.owner.profile_photo_url} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"} />
                                </div>
                                <div>
                                    - {featuredPost.owner.username}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard
