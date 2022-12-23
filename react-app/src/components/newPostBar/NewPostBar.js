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
                <div className='feed-profile-photo' >
                    <img src={`${user.profile_photo_url}`}></img>
                </div>
                <div className='new-post-options'>
                    <div className='new-post-option-button'>
                        <input onClick={() => mountTextModal()} type='image' src='https://www.svgrepo.com/show/372715/text.svg'></input>
                    </div>
                    <div className='new-post-option-button'>
                        <input onClick={() => mountQuoteModal()} type='image' src='https://www.svgrepo.com/show/340879/quotes.svg'></input>
                    </div>
                    <div className='new-post-option-button'>
                        <input onClick={() => mountPhotoModal()} type='image' src='https://www.svgrepo.com/show/158771/photo.svg'></input>
                    </div>
                </div>
            </div>
        </>


    )
}

export default NewPostBar
