import React from 'react';
import {
    Typography,
    Button,
} from '@material-ui/core';
import Main from '../../Images/main.jpg';
import Main2 from '../../Images/main2.jpg';
import './LandingPage.css'

// import that allows us to smoothly scroll to different sections
let scrollToElement = require('scroll-to-element');

// simple constant that holds the landing page image and the button to learn more
const LandingPage = () => (
        <div id="landing-page">
            <img
                alt="Smoke n' Mirrors"
                className="landing-pic-image"
                id="image-large" src={Main}
            />
            <img
                alt="Smoke n' Mirrors"
                className="landing-pic-image"
                id="image-small" src={Main2}
            />
            <Typography
                id="company-name"
                variant="title"
            >
                Smoke n' Mirrors
            </Typography>
            <div id="landing-button-container">
                    <Button id="landing-button"
                            onClick={() =>
                                scrollToElement("#info-section", {
                                    offset: -52,
                                    ease: 'inOutCube',
                                    duration: 1000
                                })}
                    >
                        Learn More
                    </Button>
            </div>
        </div>
);

export default LandingPage;