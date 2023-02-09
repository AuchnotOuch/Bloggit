import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

const Welcome = ({ mountWelcome, setMountWelcome }) => {
    return (
        <div className='welcome'>
            <button onClick={() => setMountWelcome(!mountWelcome)} id="cancel-welcome-x"><i className="fa-solid fa-xmark"></i></button>
            <h1>Welcome to</h1>
            <div className="welcome-blogsta">Blogsta</div>
            <div className="welcome-pitch">
                <h1>-We're a community of creatives posting
                    our thoughts, ideas, and inspirations
                    through words and images.</h1>
            </div>
            <div className="welcome-question">
                Care to join us?
            </div>
            <div className="welcome-buttons-container">
                <Link to='/sign-up' ><button id="signup-welcome">Let's do this.</button></Link>
                <button onClick={() => setMountWelcome(!mountWelcome)} id="cancel-welcome">No thanks. I'll just look around.</button>
            </div>
            <div className="login-welcome">
                <Link id='welcome-member-login' to='/login'>Already a member? Login here.</Link>
            </div>
        </div>
    )
}

export default Welcome
