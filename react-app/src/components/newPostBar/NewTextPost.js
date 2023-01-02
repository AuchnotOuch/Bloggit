import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const NewTextPost = ({ mountText, setMountText }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []
        if (!title && !content) {
            errors.push("Please provide either a title or some content for your post, or both")
        }
        if (title.length > 500) {
            errors.push("Title must be 500 or less characters")
        }
        if (content.length > 10000) {
            errors.push("Post content must be 10000 or less characters")
        }
        setErrors(errors)
    }, [title, content])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTextPost = {
            owner_id: user.id,
            type: "text",
            title,
            content
        }

        setMountText(!mountText)
        dispatch(thunkCreatePost(newTextPost))
        dispatch(thunkGetAllPosts())
    }
    return (
        <div className="new-post-modal">
            <div className='feed-profile-photo' >
                <img src={`${user.profile_photo_url}`}></img>
            </div>
            <div className='post-header'>
                <Link to={`/${user.username}`}>{user.username}</Link>
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
                <div className="cancel-submit-container">
                    <button onClick={() => setMountText(!mountText)}>cancel</button>
                    <button disabled={!!errors.length} onClick={handleSubmit}>post</button>
                </div>
            </div>
        </div>
    )
}


export default NewTextPost
