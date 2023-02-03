import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewTextPost from './NewTextPost';
import NewQuotePost from './NewQuotePost'
import NewPhotoPost from './NewPhotoPost'

const NewPostBar = () => {
    const user = useSelector(state => state.session.user)
    const [mountText, setMountText] = useState(false)
    const [mountQuote, setMountQuote] = useState(false)
    const [mountPhoto, setMountPhoto] = useState(false)

    function mountTextModal() {
        setMountText(!mountText)
    }
    function mountQuoteModal() {
        setMountQuote(!mountQuote)
    }
    function mountPhotoModal() {
        setMountPhoto(!mountPhoto)
    }

    useEffect(() => {

    }, [mountText, mountQuote, mountPhoto])
    return (
        <>
            {mountText &&
                <>
                    <NewTextPost mountText={mountText} setMountText={setMountText} />
                </>
            }
            {mountQuote &&
                <>
                    <NewQuotePost mountQuote={mountQuote} setMountQuote={setMountQuote} />
                </>
            }
            {mountPhoto &&
                <>
                    <NewPhotoPost mountPhoto={mountPhoto} setMountPhoto={setMountPhoto} />
                </>
            }
            <div className='container'>
                <Link to={`/users/${user.id}`}>
                    <div className='feed-profile-photo' >
                        <img src={`${user.profile_photo_url}`} onError={e => e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Font_B.svg/1874px-Font_B.svg.png"}></img>
                    </div>
                </Link>
                <div className='new-post-options'>
                    <div className='new-post-option-button'>
                        <button id='new-text-button' onClick={() => mountTextModal()}><i className="fa-solid fa-font"></i></button>
                        <div className='post-type-name-footer'>Text</div>
                    </div>
                    <div className='new-post-option-button'>
                        <button id='new-photo-button' onClick={() => mountPhotoModal()}><i className="fa-regular fa-image"></i></button>
                        <div className='post-type-name-footer'>Image</div>
                    </div>
                    <div className='new-post-option-button'>
                        <button id='new-quote-button' onClick={() => mountQuoteModal()}><i className="fa-solid fa-quote-left"></i></button>
                        <div className='post-type-name-footer'>Quote</div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default NewPostBar
