import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import './NavBar.css'
import 'font-awesome/css/font-awesome.min.css';

const filters = [
  {
    name: 'x'
  }, {
    name: 'y'
  }, {
    name: 'z'
  }, {
    name: 'a'
  }, {
    name: 'b'
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

function renderFilters() {

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

class NavBar extends React.Component {

  constructor() {

    super();

    this.state = {

      renderSearch: false,
      renderSideNav: false,
      renderDropMenu: false
    };

    this.handleResizeCheck = this.handleResizeCheck.bind(this);
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeCheck);
  }

  handleResizeCheck() {
    if (window.innerWidth >= 825) {
      this.setState({renderSideNav: false});
    } else {
      this.setState({renderDropMenu: false, renderSearch: false});

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

  handleToggleDropMenu = () => {

    this.setState(prevState => ({

      renderDropMenu: !prevState.renderDropMenu
    }));

  }

  renderSearchBar() {

    if (this.state.renderSearch) {
      return (<Fade in={this.state.renderSearch} direction="left" timeout={1000}>
        <div id="search-bar-container">
          <input id="search-bar" type="search" placeholder="Search.."/>
          <IconButton onClick={this.handleToggleSearch} id="search-icon" aria-label="Menu">
            <i className="fa fa-search"></i>
          </IconButton>
        </div>
      </Fade>);
    } else {
      return (<div id="search-bar-container">
        <IconButton onClick={this.handleToggleSearch} id="search-icon" aria-label="Menu">
          <i className="fa fa-search"></i>
        </IconButton>
      </div>);
    }
  }

  renderSideNav() {

    return (<Drawer className="drawer" variant="temporary" open={this.state.renderSideNav} onClose={this.handleToggleSideNav}>
      <div id="side-nav-container">
        <Grow in={this.state.renderSideNav}>
          <Typography id="category">
            Filter By:
          </Typography>
        </Grow>

        <hr/> {
          filters.map((filter, i) => (<div key={filter.name} class="side-filter-container">
            <Grow in={this.state.renderSideNav} style={{
                transformOrigin: '0 0 0'
              }} {...(this.state.renderSideNav ? { timeout: 200 * (i + 1)} : {})}>
              <Typography id="side-filter">
                {filter.name}

              </Typography>
            </Grow>
            <hr/></div>))
        }
        <Grow in={this.state.renderSideNav} style={{
            transformOrigin: '0 0 0'
          }} {...(this.state.renderSideNav ? { timeout: 200 * (filters.length + 1)} : {})}>
          <Typography id="category">
            My Stuff:
          </Typography>
        </Grow>

        <hr/>{
          settings.map((item, i) => (<div key={item.name} class="side-filter-container">
            <Grow in={this.state.renderSideNav} style={{
                transformOrigin: '0 0 0'
              }} {...(this.state.renderSideNav ? { timeout: 200 * (filters.length + i + 2)} : {})}>
              <Typography id="side-filter">
                {item.name}

              </Typography>
            </Grow>
            <hr/></div>))
        }
      </div>
    </Drawer>);

  }

  renderLogo() {

    return (<Grid className="grid" item="item" xs={this.determineInnerGridSize()}>
      <Zoom in={true}>
        <div id="logo-container"></div>
      </Zoom>
    </Grid>);

  }

  renderDropMenu() {
    if (this.state.renderDropMenu) {
      return (<Fade in={this.state.renderDropMenu} timeout={500} id="menu-key-down" style={{
          transformOrigin: '0 0 0'
        }}>
        <div id="menu-key-down">
          <div id="drop-menu">
            <Paper style={{
                margin: 3
              }}>
              <MenuList>
                {
                  settings.map(item => (<MenuItem key={item.name} id="drop-menu-item" onClick={this.handleToggleDropMenu}>
                    {item.name}
                  </MenuItem>))
                }
              </MenuList>
            </Paper>

          </div>
        </div>
      </Fade>);
    } else {
      return null;
    }
  }

  determineOuterGridSize() {

    if (this.state.renderSearch) {
      return 5;
    } else {
      return 4;
    }
  }

  determineInnerGridSize() {

    if (this.state.renderSearch) {
      return 2;
    } else {
      return 4;
    }
  }

  render() {
    return (<div id="main-container">
      <AppBar position="static" id="appBar">
        <Toolbar id="top-row">
          <Grid container="container">
            <Grid className="grid" item="item" xs={this.determineOuterGridSize()}>
              <div id="menu-container">
                <IconButton id="hamburger" aria-label="Menu" onClick={this.handleToggleSideNav}>
                  <MenuIcon/>
                </IconButton>
                <Typography id="title" variant="title" color="inherit">
                  Relay
                </Typography>
              </div>
            </Grid>
            {this.renderLogo()}
            <Grid className="grid" item="item" xs={this.determineOuterGridSize()}>
              <div id="icon-container">
                <IconButton id="heart-icon" aria-label="Menu">
                  <i className="fa fa-heart"></i>
                </IconButton>
                <IconButton id="settings-icon" aria-label="Menu" onClick={this.handleToggleDropMenu}>
                  <i className="fa fa-cog"></i>
                </IconButton>
                {this.renderDropMenu()}
              </div>
              {this.renderSearchBar()}
            </Grid>
          </Grid>
        </Toolbar>
        <Toolbar id="bottom-row">
          {renderFilters()}
        </Toolbar>
        {this.renderSideNav()}
      </AppBar>
    </div>);
  };
}

export default NavBar;
