import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import './NavBar.css'
import 'font-awesome/css/font-awesome.min.css';
import SideNav from './test.js';
const filters = [
  {
    name: 'Finn'
  }, {
    name: 'Chase Mobile'
  }, {
    name: 'Ink'
  }, {
    name: 'Chase Online'
  }, {
    name: 'QuickPay'
  }
];
const settings = [
  {
    name: 'Favorites'
  }, {
    name: 'Pinned Posts'
  }, {
    name: 'Profile'
  }, {
    name: 'Settings'
  }
];

class NavBar extends React.Component {

  constructor() {

    super();

    this.state = {

      renderSearch: false,
      renderSideNav: false
    };

    this.handleResizeCheck = this.handleResizeCheck.bind(this);
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeCheck);
  }

  handleResizeCheck() {
    if (window.innerWidth >= 600) {
      this.setState({renderSideNav: false});
    }
  }

  handleToggleSearch = () => {

    this.setState(prevState => ({

      renderSearch: !prevState.renderSearch
    }));

  }

  handleToggleSideNav = () => {

    this.setState(prevState => ({

      renderSideNav: !prevState.renderSideNav
    }));

  }

  renderSearchOrLogo() {

    if (this.state.renderSearch) {

      return (<div id="search-bar-container">
        <input id="search-bar" type="search" placeholder="Search.."/></div>);
    } else {
      return (<div id="logo-container"></div>);
    }

  };

  renderFilters() {

    return (<Grid container="container">
      <Grid className="grid" item="item" xs={1}/> {
        filters.map(filter => (<Grid key={filter.name} className="grid" item="item" xs={2}>

          <Typography className="toolbar-filter" color="inherit">
            {filter.name}

          </Typography>

        </Grid>))
      }

      <Grid className="grid" item="item" xs={1}/>
    </Grid>);
  };

  renderSideNav() {
    if (this.state.renderSideNav) {
      return (<Drawer className="drawer" variant="temporary" open={this.state.renderSideNav} onClose={this.handleToggleSideNav}>
        <div id="side-nav-container" tabIndex={0} role="button" onKeyDown={this.handleToggleSideNav}>

          <Typography id="category">
            Filter By:
          </Typography>

          <hr/> {
            filters.map(filter => (<div class="side-filter-container">
              <Typography id="side-filter">
                {filter.name}

              </Typography>
              <hr/></div>))
          }

          <Typography id="category">
            My Stuff:
          </Typography>

          <hr/>{
            settings.map(item => (<div class="side-filter-container">
              <Typography id="side-filter">
                {item.name}

              </Typography>
              <hr/></div>))
          }

        </div>
      </Drawer>);
    }
  }

  render() {
    return (<div id="main-container">
      <AppBar position="static" id="appBar">
        <Toolbar id="top-row">
          <Grid container="container">
            <Grid className="grid" item="item" xs={4}>
              <div id="menu-container">
                <IconButton id="hamburger" aria-label="Menu" onClick={this.handleToggleSideNav}>
                  <MenuIcon/>
                </IconButton>
                <Typography id="title" variant="title" color="inherit">
                  Relay
                </Typography>
              </div>
            </Grid>
            <Grid className="grid" item="item" xs={4}>
              {this.renderSearchOrLogo()}
            </Grid>
            <Grid className="grid" item="item" xs={4}>
              <div id="icon-container">
                <IconButton onClick={this.handleToggleSearch} id="search-icon" aria-label="Menu">
                  <i className="fa fa-search"></i>
                </IconButton>
                <IconButton id="heart-icon" aria-label="Menu">
                  <i className="fa fa-heart"></i>
                </IconButton>
                <IconButton id="settings-icon" aria-label="Menu">
                  <i className="fa fa-cog"></i>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
        <Toolbar id="bottom-row">
          {this.renderFilters()}
        </Toolbar>
        {this.renderSideNav()}
      </AppBar>
    </div>);
  };
}

export default NavBar;
