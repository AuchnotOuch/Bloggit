import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewTextPost from './NewTextPost';

const NewPostBar = () => {
    const user = useSelector(state => state.session.user)
    const [mountText, setMountText] = useState(false)
    const [mountQuote, setMountQuote] = useState(false)
    const [mountPhoto, setMountPhoto] = useState(false)
    console.log(mountText)
    function mountTextModal() {
        setMountText(!mountText)
    }
    useEffect(() => {

    }, [mountText])
    return (
        <>
            {mountText &&
                <>
                    <NewTextPost mountText={mountText} setMountText={setMountText} />
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
                        <input type='image' src='https://www.svgrepo.com/show/340879/quotes.svg'></input>
                    </div>
                    <div className='new-post-option-button'>
                        <input type='image' src='https://www.svgrepo.com/show/158771/photo.svg'></input>
                    </div>
                </div>
            </div>
        </>


    )
}

export default NewPostBar
