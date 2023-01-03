import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const NewQuotePost = ({ mountQuote, setMountQuote }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [source, setSource] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []
        if (!source && !content) {
            errors.push("You must provide a quote and a source")
        }
        if (source.length > 100) {
            errors.push("Source must be 100 or less characters")
        }
        if (content.length > 10000) {
            errors.push("Post content must be 10000 or less characters")
        }
        setErrors(errors)
    }, [source, content])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newQuotePost = {
            owner_id: user.id,
            type: "quote",
            quote_source: source,
            content
        }
        setMountQuote(!mountQuote)
        dispatch(thunkCreatePost(newQuotePost))
        dispatch(thunkGetAllPosts())
    }
    return (
        <div className="background-blur">
            <div className="new-post-modal">
                <div className='feed-profile-photo' >
                    <img src={`${user.profile_photo_url}`}></img>
                </div>
                <div className='new-post-header'>
                    <div className="new-header-section">
                        <Link to={`/${user.username}`}>{user.username}</Link>
                    </div>
                    <div className='text-form-container'>
                        <form className="text-form">
                            <textarea
                                type="text"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Quote"
                                id="content-input"
                            />
                            <input
                                type="text"
                                value={source}
                                onChange={e => setSource(e.target.value)}
                                placeholder="Source"
                                id="title-input"
                            />
                            <ul>
                                {errors.map(error => <li id="error" key={error}>{error}</li>)}
                            </ul>
                        </form>
                    </div>
                    <div className="cancel-submit-container">
                        <button onClick={() => setMountQuote(!mountQuote)}>cancel</button>
                        <button disabled={!!errors.length} onClick={handleSubmit}>post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewQuotePost
