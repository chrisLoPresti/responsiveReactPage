import React from 'react';
import {
    Grid,
    Typography,
    GridList,
    GridListTile,
} from '@material-ui/core';
import ImageModal from '../ImageModal/ImageModal';
import * as constants from '../../constants/constants';
import './Juices.css';

class Juices extends React.Component {

    constructor() {
        super();
        this.state = {
            openModal: false,
            imageIndex: 0,
            images: constants.juicesGallery,
        }
    };

    openImage = i => () => {
        this.setState({
            imageIndex: i,
            openModal: true,
        })
    };

    closeImage = () => {
        this.setState({
            openModal: false,
        })
    };

    render() {
        const {openModal, imageIndex, images} = this.state;
        return (
            <div id="juices-section">
                <Grid container>
                    <Grid
                        id="juices-image-container"
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
                                        className="juices-pic"
                                        alt={tile.title}
                                        onClick={this.openImage(i)}
                                        src={tile.img}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                    <Grid id="juices-info" item sm={12} md={4} className={"determine-order"}>
                        <h2 className="juices-text">
                            Check out our juices
                        </h2>
                        <Typography id="juices-paragraph">
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                            this is a test! we are wrtiting a tesdt! we love to write tests!
                        </Typography>
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

export default Juices;