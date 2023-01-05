import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionClearComments } from "../../store/comments";
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";
import "../landing/Landing.css"


const NewPhotoPost = ({ mountPhoto, setMountPhoto }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    const [imageUrl, setImageUrl] = useState('')
    const [caption, setCaption] = useState('')

    useEffect(() => {
        const errors = []
        if (!imageUrl) {
            errors.push("You must provide an image url")
        }
        setErrors(errors)
    }, [imageUrl])


    const handleSubmit = (e) => {
        e.preventDefault()

        const newPhotoPost = {
            owner_id: user.id,
            type: "photo",
            image_url: imageUrl,
            image_caption: caption,
            content
        }

        console.log(newPhotoPost)

        setMountPhoto(!mountPhoto)
        dispatch(thunkCreatePost(newPhotoPost))
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
                        <Link to={`/${user.username}`}>{user.username}</Link>
                    </div>
                    <div className="text-form-container">
                        <form className="text-form">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="Image Url"
                                required
                            />
                            <input
                                type="text"
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                placeholder="Add a caption."
                                id="title-input"
                            />
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
                    <div className="cancel-submit-container">
                        <button id='cancel-text' onClick={() => setMountPhoto(!mountPhoto)}>cancel</button>
                        <button id='submit-text' disabled={!!errors.length} onClick={handleSubmit}>post</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewPhotoPost
