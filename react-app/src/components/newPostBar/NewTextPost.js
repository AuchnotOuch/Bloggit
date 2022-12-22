import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../landing/Landing.css"


const NewTextPost = ({ mountText, setMountText }) => {
    const user = useSelector(state => state.session.user)

    return (
        <div className="new-post-modal">
            <div className='feed-profile-photo' >
                <img src={`${user.profile_photo_url}`}></img>
            </div>
            <div className='post-header'>
                <Link to={`/${user.username}`}>{user.username}</Link>
                <div className='text-form'>
                    <form>
                        <input type="text"></input>
                        <input type="text"></input>
                    </form>
                </div>
                <div className="cancel-submit-container">
                    <button onClick={() => setMountText(!mountText)}>cancel</button>
                    <button>post</button>
                </div>
            </div>
        </div>
    )
}


export default NewTextPost
