import React from 'react';
import {
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import './AboutUs.css';

// import that allows us to smoothly scroll to different sections
let scrollToElement = require('scroll-to-element');

// simple grid: contains about us text, image, and button to go to form
const AboutUs = () => (
    <div id="about-section">
        <Grid container>
            <Grid item sm={12} md={7}>
                <h2 className="about-text">
                    A little about us ...
                </h2>
                <Typography id="about-paragraph">
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                </Typography>
                <div id="button-container">
                    <Button id="about-question-button"
                            onClick={() => scrollToElement("#contact-section", {
                                offset: -52,
                                ease: 'inOutCube',
                                duration: 1000
                            })}>
                        Questions? Shoot us an email
                    </Button>
                </div>
            </Grid>
            <Grid
                id="about-image-container"
                item sm={12}
                md={5}>
                <img
                    alt='About Us'
                    id="about-image"
                    src={require('../../Images/about.jpg')}
                />
            </Grid>

        </Grid>
    </div>
);

export default AboutUs;