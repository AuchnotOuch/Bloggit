import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { thunkGetAllPosts, thunkUpdatePost } from "../../store/posts";
import "../landing/Landing.css"


const EditPost = ({ blur, setBlur, editId, mountEdit, setMountEdit }) => {
    const post = useSelector(state => state.posts[editId])
    console.log(post)
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
            errors.push("You must provide at least a quote")
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
        setBlur(!blur)
        dispatch(thunkUpdatePost(editedPost))
        // dispatch(thunkGetAllPosts())
    }

    if (!post || !editId) return null
    return (
        <>
            <div className="new-post-modal">
                <div className='feed-profile-photo' >
                    <img src={`${user.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                </div>
                <div className='new-post-header'>
                    <div className="new-header-section">
                        <div className="owner-header-edit">{post.owner.username}</div>

                        {/* <Link to={`/${user.username}`}>{user.username}</Link> */}
                    </div>
                    {post.type === 'text' &&
                        <div className='text-form-container'>
                            <form className="text-form">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Title"
                                    id="title-input"
                                />
                                <textarea
                                    type="text"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Insert text here..."
                                    id="content-input"
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
                                <div>
                                    <textarea
                                        type="text"
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        placeholder='"Quote"'
                                        id="quote-input"
                                    />
                                </div>
                                <div>
                                    <label>-</label>
                                    <input
                                        type="text"
                                        value={source}
                                        onChange={e => setSource(e.target.value)}
                                        placeholder="Source"
                                        id="quote-source-input"
                                    />
                                </div>
                                <ul>
                                    {errors.map(error => <li id="error" key={error}>{error}</li>)}
                                </ul>
                            </form>
                        </div>
                    }
                    {post.type === 'photo' &&
                        <div className='text-form-container'>
                            <form className="text-form">
                                <textarea
                                    type="text"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Have more to say about this photo?"
                                    id="content-input"
                                />
                                <ul>
                                    {errors.map(error => <li id="error" key={error}>{error}</li>)}
                                </ul>
                            </form>
                        </div>
                    }
                    <div className="cancel-submit-container">
                        <button id='cancel-text' onClick={() => { setBlur(!blur); setMountEdit(!mountEdit) }}>Cancel</button>
                        <button id='submit-text' disabled={!!errors.length} onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPost
