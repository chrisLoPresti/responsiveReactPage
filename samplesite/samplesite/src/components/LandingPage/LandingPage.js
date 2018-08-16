import React from 'react';
import {
    Typography,
    Button,
} from '@material-ui/core';
import ScrollIntoView from 'react-scroll-into-view';
import Main from '../../Images/main.jpg';
import Main2 from '../../Images/main2.jpg';
import './LandingPage.css'

const LandingPage = () => (
    <div>
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
                <ScrollIntoView
                    selector="#info-section">
                    <Button id="landing-button">
                        Learn More
                    </Button>
                </ScrollIntoView>
            </div>
        </div>
    </div>
);

export default LandingPage;