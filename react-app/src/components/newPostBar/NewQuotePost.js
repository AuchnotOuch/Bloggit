import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionClearComments } from "../../store/comments";
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const NewQuotePost = ({ mountQuote, setMountQuote }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [source, setSource] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        const errors = []
        if (!source && !content) {
            errors.push("A quote is required")
        }
        if (source.length > 100) {
            errors.push("Source must be 100 or less characters")
        }
        if (content.length > 10000) {
            errors.push("Post content must be 10000 or less characters")
        }
        if (source && !content) {
            errors.push("A quote is required")
        }
        setErrors(errors)
    }, [source, content])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (!!errors.length) return
        const newQuotePost = {
            owner_id: user.id,
            type: "quote",
            quote_source: source,
            content
        }
        setMountQuote(!mountQuote)
        dispatch(thunkCreatePost(newQuotePost))
        dispatch(actionClearComments())
        dispatch(thunkGetAllPosts())
    }
    return (
        <div className="background-blur">
            <div className="new-post-modal">
                <div className='feed-profile-photo' >
                    <img src={`${user.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                </div>
                <div className='new-post-header'>
                    <div className="new-header-section">
                        <div>{user.username}</div>

                        {/* <Link to={`/${user.username}`}>{user.username}</Link> */}
                    </div>
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
                                {submit && !!errors.length && errors.map(error => <li style={{ color: 'red' }} id="error" key={error}>{error}</li>)}
                            </ul>
                        </form>
                    </div>
                    <div className="cancel-submit-container">
                        <button id='cancel-text' onClick={() => setMountQuote(!mountQuote)}>cancel</button>
                        <button id='submit-text' onClick={handleSubmit}>post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewQuotePost
