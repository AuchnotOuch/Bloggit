import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllPosts } from '../../store/posts';
import NewPostBar from "../newPostBar/NewPostBar";
import DeletePost from "../posts/Delete";
import EditPost from "../posts/Edit";
import '../landing/Landing.css'

const Dashboard = () => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)

    const [mountDelete, setMountDelete] = useState(false)
    const [mountEdit, setMountEdit] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [editId, setEditId] = useState(null)

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
                            <div className='post-container'>
                                <div className='feed-profile-photo' >
                                    <img src={`${post.owner.profile_photo_url}`}></img>
                                </div>
                                <div className='post-header'>
                                    <div className="header-section">
                                        <Link to={`/${post.owner.username}/post/${post.id}`}>{post.owner.username}</Link>
                                    </div>
                                    <div className='post-content'>
                                        {post.type === 'text' &&
                                            <>
                                                <div className='title'>{post.title}</div>
                                                <div className='content'>{post.content}</div>
                                            </>
                                        }
                                        {post.type === 'quote' &&
                                            <>
                                                <div className='quote-body'>"{post.content}"</div>
                                                <div className='quote-source'>- {post.quote_source}</div>
                                            </>
                                        }
                                        {post.type === 'photo' &&
                                            <>
                                                {Object.values(post.photos).map(photo => (
                                                    <div className='image-post-container'>
                                                        <div className='post-image'>
                                                            <img src={photo.url}></img>
                                                        </div>
                                                        <div className='post-image-caption'>{photo.text}</div>
                                                    </div>
                                                ))}
                                                <div className="photo-content">{post.content}</div>
                                            </>
                                        }
                                        {post.owner.id === user.id &&
                                            <>
                                                <div className="edit-delete-buttons">
                                                    <button onClick={() => mountEditModal(post.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                                    <button onClick={() => mountDeleteModal(post.id)}><i className="fa-regular fa-trash-can"></i></button>
                                                </div>
                                            </>
                                        }
                                        <div className="post-footer">
                                            <div>Notes</div>
                                            <div className="comment-like-container">
                                                <div><i class="fa-regular fa-comment"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='side-section'>Side Section</div>
                </div>
            </div>
        </>

    )
}

export default Dashboard
