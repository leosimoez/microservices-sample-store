import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({
  grow2: {
    flexGrow: 2,
  },

  grow: {
    flexGrow: 2,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    flexGrow: 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  sectionDesktop: {
    display: 'flex',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  }
}));

const Navbar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const [search, setSearch] = React.useState('');
  const handleChangeSearch = (event) => {
      setSearch(event.target.value);
    }

  const handleDoSearch = (event) => {
    if(event.key === 'Enter'){
      if(search.length >= 3 || search.length === 0) {
        props.doSearch(search);
      }
    }
  }

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow2}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
        <div className={classes.grow} />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleMenuVisible}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Sample Store
          </Typography>
          {/* <div className={classes.grow} /> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={search}
              onChange={handleChangeSearch}
              onKeyPress={handleDoSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show {basketTotalItems} items" color="inherit" onClick={props.toggleCartVisible}>
              {/* <IconButton aria-label="show 17 new notifications" color="inherit" component={RouterLink} to="/cart" > */}
              <Badge badgeContent={props.basketTotalItems} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.grow2} />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
export default withRouter(withStyles(useStyles)(Navbar));