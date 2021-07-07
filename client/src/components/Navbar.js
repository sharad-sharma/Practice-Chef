import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Button, Link as Link2 } from '@material-ui/core';
import { Divider, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import clsx from 'clsx'
import axios from 'axios';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 90,
    // marginBottom: 30,
  },
  usermenu: {
    marginTop: theme.spacing(5),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  user: {
    marginLeft: theme.spacing(2),
  },
  username: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#2962ff',
  },
  List_width: {
    width: 200,
    color: '#8e24aa',
  },
}));

function Navbar({ changeUser, navmssg, doRefresh, isAuthenticated }) {
  const classes = useStyles();
  
  const [username, setUsername] = useState('')
  const [isAuth, setisAuth] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    // console.log('here me')
    axios
      .get("http://localhost:5000/auth/isAuthenticated", {
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res, "Navbar.js");
        if (res.data === "NO") {
          //console.log("Not logged in -navbar");
          setisAuth(false);
        } else {
          setisAuth(true);
          setUsername(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.List_width}>
        {/* <div align="center">
          <img style={{maxWidth: 150}} src='./LogoMy.png' alt="Logo" />
        </div> */}
        <ListItem button key={'Problem Forces'} >
          <Typography variant="h6" className={classes.title}>
            PracticeChef
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'Contests'} component={Link} to="/">
          <ListItemText primary={'Contests'} />
        </ListItem>
        {/* <ListItem button key={'Problemset'} component={Link} to="/problems">
          <ListItemText primary={'Problemset'} />
        </ListItem> */}
        <ListItem button key={'Discuss'} component={Link} to="/problems">
          <ListItemText primary={'Discuss'} />
        </ListItem>
        
        
      </List>
      <Divider />
      <ListItem button key={'Codechef'} component={Link2} target="_blank" rel="noopener" href="https://Codechef.com">
        <ListItemText primary={'CodeChef'} />
      </ListItem>
      <ListItem button key={'Problemforces'} component={Link2} target="_blank" rel="noopener" href="https://Problemforces.firebaseapp.com">
        <ListItemText primary={'Problemforces'} />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Practice Chef
          </Typography>
          {/* <Button color="inherit" component={Link} to="/">
            Contests
          </Button>
          <Button color="inherit" component={Link} to="/problems">
            Problemset
          </Button> */}
          
          <div>
            {
              !isAuth ?
                <Button color="inherit" href="http://localhost:5000/auth/loginwithcodechef">Login</Button>
              :
                // <Button color="inherit" href="http://localhost:5000/auth/logout">Logout {username}</Button>
                
                <Button color="inherit" aria-label="menu" style={{textTransform: 'lowercase'}} onClick={handleClick2}>{username} <ArrowDropDownIcon /> </Button>
              
            }
            
            <Menu
              id="simple-menu"
              className={classes.usermenu}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose2}
            >
              <MenuItem component={Link2} target="_blank" rel="noopener" href={`https://www.codechef.com/users/${username}`} onClick={handleClose2}>Profile</MenuItem>
              <MenuItem component={Link2} rel="noopener" href="http://localhost:5000/auth/logout" onClick={handleClose2}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        
      </AppBar>
    </div>
  );
}

export default Navbar