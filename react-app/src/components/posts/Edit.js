import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { thunkGetAllPosts, thunkUpdatePost } from "../../store/posts";
import "../landing/Landing.css"


const EditPost = ({ editId, mountEdit, setMountEdit }) => {
    const post = useSelector(state => state.posts[editId])
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const [source, setSource] = useState(post.quote_source)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []
        if (!title && !content) {
            errors.push("Please provide either a title or some content for your post, or both")
        }
        if (title && title.length > 500) {
            errors.push("Title must be 500 or less characters")
        }
        if (content && content.length > 10000) {
            errors.push("Post content must be 10000 or less characters")
        }
        if (post.type === 'quote' && !source && !content) {
            errors.push("You must provide a quote and a source")
        }
        if (post.type === 'quote' && source.length > 100) {
            errors.push("Source must be 100 or less characters")
        }
        setErrors(errors)
    }, [title, content, source])

    const handleSubmit = (e) => {
        e.preventDefault()

        const editedPost = {
            postId: post.id,
            title,
            content,
            quote_source: source,
        }

        setMountEdit(!mountEdit)
        dispatch(thunkUpdatePost(editedPost))
        dispatch(thunkGetAllPosts())
    }
    return (
        <>
            <div className="new-post-modal">
                <div className='feed-profile-photo' >
                    <img src={`${user.profile_photo_url}`}></img>
                </div>
                <div className='post-header'>
                    <Link to={`/${user.username}`}>{user.username}</Link>
                    {post.type === 'text' &&
                        <div className='text-form-container'>
                            <form className="text-form">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Title"
                                />
                                <input
                                    type="text"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Insert text here..."
                                />
                                <ul>
                                    {errors.map(error => <li id="error" key={error}>{error}</li>)}
                                </ul>
                            </form>
                        </div>
                    }
                    {post.type === 'quote' &&
                        <div className='text-form-container'>
                            <form className="text-form">
                                <input
                                    type="text"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Quote"
                                />
                                <input
                                    type="text"
                                    value={source}
                                    onChange={e => setSource(e.target.value)}
                                    placeholder="Source"
                                />
                                <ul>
                                    {errors.map(error => <li id="error" key={error}>{error}</li>)}
                                </ul>
                            </form>
                        </div>
                    }
                    {post.type === 'photo' &&
                        <div className='text-form-container'>
                            <form className="text-form">
                                <input
                                    type="text"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Have more to say about this photo?"
                                />
                                <ul>
                                    {errors.map(error => <li id="error" key={error}>{error}</li>)}
                                </ul>
                            </form>
                        </div>
                    }
                    <div className="cancel-submit-container">
                        <button onClick={() => setMountEdit(!mountEdit)}>Cancel</button>
                        <button disabled={!!errors.length} onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPost
