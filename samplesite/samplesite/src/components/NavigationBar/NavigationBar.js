import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
} from '@material-ui/core';
import {
    Home,
    LocationOn,
    Menu,
} from '@material-ui/icons';
import './NavigationBar.css';
import DropdownList from '../DropdownList/DropdownList';
import * as constants from '../../constants/constants';

// import that allows us to smoothly scroll to different sections
let scrollToElement = require('scroll-to-element');

class NavigationBar extends React.Component {

    constructor() {
        super();
        this.state = {
            scrolled: false,
            openDropdownList: false,
        };
    }

    // scroll listener used to determine how far from the top of the page we are
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    // removes the listener when the component unmounts
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    // when we scroll, check to see if we are 80 pixels from the top and if so, make the navbar solid
    handleScroll = () => {
        const top = document.documentElement.scrollTop
            || document.body.parentNode.scrollTop
            || document.body.scrollTop;
        if (top < 80) {
            this.setState({
                scrolled: false,
            });
        }
        else if (top >= 80) {
            this.setState({
                scrolled: true,
            });
        }
    };

    // when you click the hamburger button, render the drop down list with options
    handleClickMenu = () => {
        this.setState({
            openDropdownList: !this.state.openDropdownList,
        });
    };

    // simple navbar that holds buttons that when clicked, scroll you to a different section
    render() {
        const {scrolled, openDropdownList} = this.state;
        return (
            <div id="nav-container">
                <AppBar className={scrolled ? "nav-scrolled" : "nav-bar"}>
                    <Toolbar>

                        <IconButton
                            onClick={() =>
                                scrollToElement("#nav-container", {
                                    offset: 0,
                                    ease: 'inOutBack',
                                    duration: 1500
                                })}
                            className="nav-button">
                            <Home className="icon"/>
                        </IconButton>

                        <div id="icon-button-container">
                            <div id="large-screen-container">
                                {constants.sections.map(section => (
                                    <Button
                                        key={section}
                                        onClick={() =>
                                        scrollToElement(`#${section}-section`, {
                                            offset: -52,
                                            ease: 'inOutCube',
                                            duration: 1000
                                        })}
                                            className="nav-button">
                                        {section}
                                    </Button>
                                ))}
                            </div>
                            <div id="small-screen-container">
                                <IconButton
                                    href="https://www.google.com/maps/dir/''/terrestrial+imaging/@40.0990103,-74.170918
                                    2,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c3d31d07e794bb:0xad6365cfdddfb3!2m2!1d-74.100
                                    8783!2d40.0990314"
                                    target="_blank"
                                    className="nav-button">
                                    <LocationOn className="icon"/>
                                </IconButton>
                                <IconButton onClick={this.handleClickMenu} className="nav-button">
                                    <Menu className="icon"/>
                                </IconButton>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <DropdownList
                    open={openDropdownList}
                    onHandleClose={this.handleClickMenu}
                />
            </div>
        );
    };
};

export default NavigationBar;