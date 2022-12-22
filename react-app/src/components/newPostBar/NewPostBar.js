import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NewPostBar = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div className='container'>
            <div className='feed-profile-photo' >
                <img src={`${user.profile_photo_url}`}></img>
            </div>
            <div className='new-post-options'>
                <div className='new-post-option-button'>Text</div>
                <div className='new-post-option-button'>Quote</div>
                <div className='new-post-option-button'>Photo</div>
            </div>
        </div>
    )
}

export default NewPostBar
