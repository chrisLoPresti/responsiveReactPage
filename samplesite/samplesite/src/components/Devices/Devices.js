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

    componentWillReceiveProps(props) {
        this.setState({
            currentIndex: props.imageIndex,
        });
    }

    openImage = (i) => () => {
        this.setState({
            openModal: true,
            imageIndex: i,
        })
    };

    closeImage = () => {
        this.setState({
            openModal: false,
            imageIndex: 0,
        })
    };

    render() {
        const {openModal, imageIndex, images} = this.state;
        return (
            <div id="devices-section">
                <Grid container>
                    <Grid id="devices-info" item sm={12} md={4}>
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
                            {images.map((tile, i) => (
                                <GridListTile
                                    key={i}
                                    cols={1}
                                >
                                    <img
                                        className="devices-pic"
                                        alt={tile.title}
                                        onClick={this.openImage(i)}
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