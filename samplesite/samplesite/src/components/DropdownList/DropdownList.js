import React from 'react';
import {
    Drawer,
    Button,
} from '@material-ui/core';
import * as constants from '../../constants/constants';
import './DropdownList.css';
import PropTypes from 'prop-types';

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
                        onClick={onHandleClose}
                        id="drop-button"
                        href={"#nav-container"}>
                        Home
                    </Button>
                    {constants.sections.map(section => (
                        <Button
                            key={section}
                            onClick={onHandleClose}
                            id="drop-button"
                            href={`#${section}-section`}>
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