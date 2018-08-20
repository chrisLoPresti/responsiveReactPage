import React from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core';
import {
    Phone,
    Email,
    LocationOn,
} from '@material-ui/icons';
import './InfoDivider.css';

// simple constant that returns 3 icons with company info: found right under the main image
const InfoDivider = () => (
    <div id="info-section">
        <Grid container>
            <Grid className="text-center" item xs={6} sm={4}>
                <Phone className="info-icon"/>
                <Typography>
                    1-(732)-987-7683
                </Typography>
                <Typography>
                    Open Monday-Saturday 9am - 5pm
                </Typography>
            </Grid>
            <Grid className="text-center" item xs={6} sm={4}>
                <LocationOn className="info-icon"/>
                <Typography>
                    Located at:
                </Typography>
                <Typography>
                    123 Main St, Freehold NJ, 07728
                </Typography>
            </Grid>
            <Grid className="text-center" item xs={12} sm={4}>
                <Email className="info-icon"/>
                <Typography>
                    smokeandmirrors@gmail.com
                </Typography>
                <Typography>
                    Feel free to email us!
                </Typography>
            </Grid>
        </Grid>
    </div>
);

export default InfoDivider;