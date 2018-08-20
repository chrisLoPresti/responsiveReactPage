import React from 'react';
import {
    Drawer,
    Button,
} from '@material-ui/core';
import * as constants from '../../constants/constants';
import './DropdownList.css';
import PropTypes from 'prop-types';

// import that allows us to smoothly scroll to different sections
let scrollToElement = require('scroll-to-element');

// this is what we see as a result of clicking the hamburger button
const DropdownList = (props) => {
    const {onHandleClose, open} = props;
    return (
        <div>
            <Drawer
                anchor="top"
                open={open}
                onClose={onHandleClose}
            >
                <div
                    tabIndex={0}
                    role="button"
                    id="drop-button-container"
                >
                    <Button
                        id="drop-button"
                        onClick={() => {
                            onHandleClose();
                            scrollToElement("#nav-container", {
                                offset: -52,
                                ease: 'inOutCube',
                                duration: 1000
                            });
                        }}
                    >
                        Home
                    </Button>
                    {constants.sections.map(section => (
                        <Button
                            key={section}
                            id="drop-button"
                            onClick={() => {
                                onHandleClose();
                                scrollToElement(`#${section}-section`, {
                                    offset: -52,
                                    ease: 'inOutCube',
                                    duration: 1000
                                });
                            }}
                        >
                            {section}
                        </Button>
                    ))}
                </div>
            </Drawer>
        </div>
    )
};

DropdownList.propTypes = {
    onHandleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};


export default DropdownList;