import React from 'react';
import {
    Grid,
    Typography,
    GridList,
    GridListTile,
} from '@material-ui/core';
import ImageModal from '../ImageModal/ImageModal';
import './Devices.css';
import * as constants from "../../constants/constants";

class Devices extends React.Component {

    constructor() {
        super();
        this.state = {
            openModal: false,
            imageIndex: 0,
            images: constants.devicesGallery,
        }
    };

    // opens the modal with the corresponding image that was clicked on
    openImage = (i) => () => {
        this.setState({
            openModal: true,
            imageIndex: i,
        })
    };

    // closes the modal and resets the index to 0
    closeImage = () => {
        this.setState({
            openModal: false,
            imageIndex: 0,
        })
    };

    // simple grid: Displays texts and images
    render() {
        const {openModal, imageIndex, images} = this.state;
        return (
            <div id="devices-section">
                <Grid container>
                    <Grid
                        d="devices-info"
                        item
                        sm={12}
                        md={4}>
                        <h2 className="devices-text">
                            Check out our rigs and pieces
                        </h2>
                        <Typography id="devices-paragraph">
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                        </Typography>
                    </Grid>
                    <Grid
                        id="devices-image-container"
                        item sm={12}
                        md={8}
                    >
                        <GridList
                            cellHeight={160}
                            cols={3}
                        >
                            {images.map((tile, index) => (
                                <GridListTile
                                    key={index}
                                    cols={1}
                                >
                                    <img
                                        className="devices-pic"
                                        alt={tile.title}
                                        onClick={this.openImage(index)}
                                        src={tile.img}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
                <ImageModal
                    imageIndex={imageIndex}
                    images={images}
                    closeImage={this.closeImage}
                    open={openModal}
                />
            </div>
        )
    }
}

export default Devices;