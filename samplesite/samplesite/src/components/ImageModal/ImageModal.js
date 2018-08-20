import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    MobileStepper,
    Button,
} from '@material-ui/core';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@material-ui/icons';
import './ImageModal.css';

class ImageModal extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
        }
    }
// once props are received update the image index
    componentWillReceiveProps(props) {
        this.setState({
            currentIndex: props.imageIndex,
        });
    }
// changes images to the next image
    handleNext = () => {
        this.setState((prevState) => ({
            currentIndex: prevState.currentIndex + 1
        }));
    };
// changes images to the previous image
    handlePrev = () => {
        this.setState((prevState) => ({
            currentIndex: prevState.currentIndex - 1
        }));
    };
// simple modal with next and previous button to view images
    render() {
        const {open, images, closeImage,} = this.props;
        const {currentIndex} = this.state;
        return (
            <div>
                <Modal
                    open={open}
                    onClose={closeImage}
                >
                    <div
                        className={"modal-content modal-content-size"}
                    >
                        <img
                            className="loaded-image"
                            src={images[currentIndex].img}
                            alt={images[currentIndex].title}
                        />
                        <MobileStepper
                            steps={images.length}
                            position="static"
                            activeStep={currentIndex}
                            nextButton={
                                <Button
                                    disabled={currentIndex === images.length - 1}
                                    onClick={this.handleNext}
                                    size="small"
                                >
                                    Next
                                    {<KeyboardArrowRight/>}
                                </Button>
                            }
                            backButton={
                                <Button
                                    disabled={currentIndex === 0}
                                    onClick={this.handlePrev}
                                    size="small"
                                >
                                    {<KeyboardArrowLeft/>}
                                    Prev
                                </Button>
                            }
                        />
                    </div>
                </Modal>
            </div>
        )
    }
};

ImageModal.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    })).isRequired,
    closeImage: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ImageModal;