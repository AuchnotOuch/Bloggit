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

    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')

    useEffect(() => {
        const errors = []
        // const picTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg']
        // const validUrl = (str) => {
        //     try {
        //         const url = new URL(str)
        //         if (url.protocol === 'http:' || url.protocol === 'https:') {
        //             return true
        //         }
        //     }
        //     catch (e) {
        //         return false
        //     }
        // }

        // if (!imageUrl) {
        //     errors.push("You must provide an image url")
        // }

        // if (!picTypes.includes(imageUrl.split(".").pop())) {
        //     errors.push("Please provide a jpg, jpeg, png, gif, or svg")
        // }

        // if (!validUrl(imageUrl)) {
        //     errors.push('Please provide a valid image link')
        // }

        if (caption && caption.length > 1000) {
            errors.push("Caption must be 1000 or less characters")
        }

        if (content && content.length > 10000) {
            errors.push("Post content must be 10000 or less characters")
        }
        setErrors(errors)
    }, [caption, content])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('test')
        const formData = new FormData();
        formData.append("image", image)
        formData.append("owner_id", user.id)
        formData.append("type", "photo")
        formData.append("image_caption", caption)
        formData.append('content', content)

        const response = await fetch(`api/posts/new`, {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            await response.json()
            setMountPhoto(!mountPhoto)
            dispatch(actionClearComments())
            dispatch(thunkGetAllPosts())
        }
        return await response.json()
    }

    const updateImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
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
                    <div className="text-form-container">
                        <form onSubmit={() => handleSubmit()} className="text-form">
                            <input
                                type='file'
                                accept="image/*"
                                onChange={updateImage}
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
                            <div>
                                {errors.map(error => <div id="error" key={error}>{error}</div>)}
                            </div>
                        </form>
                    </div>
                    <div className="cancel-submit-container">
                        <button id='cancel-text' onClick={() => setMountPhoto(!mountPhoto)}>cancel</button>
                        <button id='submit-text' disabled={!!errors.length} type='submit'>post</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewPhotoPost
