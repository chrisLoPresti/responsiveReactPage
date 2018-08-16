import React from 'react';
import {
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import LocationPic from '../../Images/location.png';
import './Location.css';

const Location = () => (


    <div id="location-section">
        <Grid container>
            <Grid
                id="location-image-container"
                item
                xs={12}
                sm={6}
                md={4}
            >
                <Button
                    id="image-button"
                    href="https://www.google.com/maps/dir/''/terrestrial+imaging/@40.0990103,
                -74.1709182,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c3d31d07e794bb:0xad6365cfdddfb3!
                2m2!1d-74.1008783!2d40.0990314"
                    target="_blank"
                >
                <img
                    alt="123 freehold st"
                    id="location-pic"
                    src={LocationPic}
                />
                </Button>
            </Grid>
            <Grid
                id="location-and-hours"
                item
                xs={12}
                sm={6}
                md={4}
            >
                <Typography id="address">
                    1234 Some St, Freehold NJ, 07722
                </Typography>
                <Typography id="hours">
                    Monday: 9:00am - 5:00pm {<br/>}
                    Tuesday: 9:00am - 5:00pm {<br/>}
                    Wednesday: 9:00am - 5:00pm {<br/>}
                    Thursday: 9:00am - 5:00pm {<br/>}
                    Friday: 9:00am - 5:00pm {<br/>}
                    Saturday: 9:00am - 2:00pm {<br/>}
                    Sunday: Closed {<br/>}
                </Typography>
                <Button
                    id="direction-button"
                    href="https://www.google.com/maps/dir/''/terrestrial+imaging/@40.0990103,
                -74.1709182,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c3d31d07e794bb:0xad6365cfdddfb3!
                2m2!1d-74.1008783!2d40.0990314"
                    target="_blank"
                >
                    Directions
                </Button>
            </Grid>
            <Grid id="location-info" item sm={12} md={4}>
                <h2 className="location-text">
                    Come check us out
                </h2>
                <Typography id="location-paragraph">
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                    this is a test! we are wrtiting a tesdt! we love to write tests!
                </Typography>
            </Grid>
        </Grid>
    </div>
);

export default Location;