import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
                        />
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
                <div className="cancel-submit-container">
                    <button onClick={() => setMountPhoto(!mountPhoto)}>cancel</button>
                    <button disabled={!!errors.length} onClick={handleSubmit}>post</button>
                </div>
            </div>
        </div>
    )
}

export default NewPhotoPost
