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
import ScrollIntoView from 'react-scroll-into-view';
import * as constants from '../../constants/constants';

class NavigationBar extends React.Component {

    constructor() {
        super();
        this.state = {
            scrolled: false,
            openDropdownList: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    handleScroll = () => {
        const top = document.documentElement.scrollTop
            || document.body.parentNode.scrollTop
            || document.body.scrollTop;
        if (top < 50) {
            this.setState({
                scrolled: false,
            });
        }
        else if (top >= 50) {
            this.setState({
                scrolled: true,
            });
        }
    };

    handleClickMenu = () => {
        this.setState({
            openDropdownList: !this.state.openDropdownList,
        });
    }

    render() {
        const {scrolled, openDropdownList} = this.state;
        return (
            <div id="nav-container">
                <AppBar className={scrolled ? "nav-scrolled" : "nav-bar"}>
                    <Toolbar>
                        <ScrollIntoView
                            alignToTop={true}
                            selector="#nav-container">
                            <IconButton
                                className="nav-button">
                                <Home className="icon"/>
                            </IconButton>
                        </ScrollIntoView>
                        <div id="icon-button-container">
                            <div id="large-screen-container">
                                {constants.sections.map(section => (
                                    <ScrollIntoView
                                        key={section}
                                        alignToTop={true}
                                        selector={`#${section}-section`}>
                                        <Button className="nav-button">
                                            {section}
                                        </Button>
                                    </ScrollIntoView>
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