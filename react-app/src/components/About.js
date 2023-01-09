import React from "react";
import { Link } from "react-router-dom";
import './landing/Landing.css'

const About = () => {

    return (
        <div className="about-container">
            <div className="about-blogsta">
                <h1 id="about-blogsta-header">Blogsta</h1>
                <div id="about-blogsta-text">Blogsta, a clone of Tumblr, is a microblogging site that allows users to share their thoughts, ideas, passions, and more.
                    Blogsta lets users create text, image, and quote posts that other users can comment on.
                </div>
                <div id="coming-soon">
                    <h1 id="about-blogsta-header">Coming Soon:</h1>
                    <ul>
                        <li>Liking posts</li>
                        <li>Followers</li>
                        <li>Reblogging</li>
                    </ul>
                </div>
            </div>
            <div className="about-me">
                <h1 id="about-me-header">Developer</h1>
                <div className="about-me-container">
                    <img src="https://i.imgur.com/87xhBUe.jpg"></img>
                    <div id="about-me-info">
                        <div>Hello! My name is Alex Auch. I currently live in the beautiful state of Montana. When I'm not coding,
                            I'm enjoying the outdoors, playing The Legend of Zelda, or probably cooking!
                            Thank you for visiting Blogsta.
                        </div>
                        <div className="about-me-links">
                            <h2>Blogsta Repo:</h2>
                            <a href='https://github.com/AuchnotOuch/Blogsta' ><i className="fa-brands fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
