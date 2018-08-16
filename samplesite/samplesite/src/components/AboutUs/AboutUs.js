import React from 'react';
import {
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import './AboutUs.css';

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
                    <Button id="about-question-button">
                        Questions? Shoot us an email
                    </Button>
                </Typography>
            </Grid>
            <Grid id="about-image-container" item sm={12} md={5}>
                <img alt = 'About Us' id="about-image" src={require('../../Images/about.jpg')}/>
            </Grid>

        </Grid>
    </div>
);

export default AboutUs;