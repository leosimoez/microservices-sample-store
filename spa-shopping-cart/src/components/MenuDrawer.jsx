import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';

const styles = makeStyles((theme) => ({

  grow: {
    flexGrow: 1,
  },

  menuDrawer: {
    width: 250,
    flexShrink: 0,
  },
  menuList: {
    // width: '100%',
    width: 250,
  },
  menuFullList: {
    // width: '100%',
    width: 250,
  },
  menuPaper: {
    // width: '100%',
    width: 250,
  },
  menuHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  drawerContainer: {
    overflow: 'auto',
  }

}));

const MenuDrawer = props => {

  const classes = styles();

  const theme = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />

      <Drawer
        className={classes.menuDrawer}
        variant="persistent"
        anchor="left"
        open={props.menuIsVisible}
        classes={{
          paper: classes.menuPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap >
              Departments
          </Typography>
          <div className={classes.grow} />
            <IconButton onClick={props.toggleMenuVisible}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {props.typesList.content.map((item, index) => (
              <ListItem button key={item.type}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={item.type} onClick={() => props.setType(item.id)} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap >
              Brands
          </Typography>
          </Toolbar>
          <List>
            {props.brandsList.content.map((item, index) => (
              <ListItem button key={item.brand}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={item.brand} onClick={() => props.setBrand(item.id)} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(MenuDrawer));