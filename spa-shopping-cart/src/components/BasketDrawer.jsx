import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import compose from 'recompose/compose';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';
import BasketItem from './BasketItem';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { basketAddItem, basketRemoveItem } from './MainActions';

const styles = makeStyles((theme) => ({

  grow: {
    flexGrow: 1,
  },

  //drawer basket
  basketDrawer: {
    // width: '50%',
    flexShrink: 0,
    // backgroundColor: theme.palette.primary.main
  },
  basketList: {
    // width: '50%',
  },
  basketFullList: {
    // width: '50%',
  },
  basketPaper: {
    width: '100%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      width: '600px'
    }
  },
  contrastText: {
    color: theme.palette.primary.contrastText,
  },
  items: {
    flexGrow: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    overflow: 'scroll'
  },
  totalValue: {
    display: 'block',
    backgroundColor: theme.palette.primary.light,
    padding: '40px 0',
  },
  checkout: {
    margin: '20px',
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  item: {
    padding: '20px',
    display: 'flex',
  },
  description: {
    textAlign: 'left',
    margin: '0 10px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    flexGrow: 1
  },
  unitPrice: {
    whiteSpace: 'nowrap'
  },
  centerVertical: {
    verticalAlign: 'middle',
    // alignmentBaseline: 'middle',
    height: '48px',
    // backgroundColor: 'red'
  }

}));


const BasketDrawer = props => {

  const classes = styles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        anchor='right'
        className={classes.basketDrawer}
        variant="persistent"
        open={props.cartIsVisible}
        classes={{
          paper: classes.basketPaper,
        }}
      >
        <Toolbar>
          <div className={classes.grow} />
          <Typography className={classes.title} variant="h6" noWrap >My basket</Typography>
          <div className={classes.grow} />
          <IconButton onClick={props.toggleCartVisible}>
            <CloseIcon className={classes.contrastText} />
          </IconButton>
        </Toolbar>
        <div
          role="presentation"
          onClick={props.toggleCartVisible}
          onKeyDown={props.toggleCartVisible}
        />
        {/* <Divider /> */}
        <div className={classes.body}>
          <div className={classes.totalValue}>
      <Typography variant="h3" noWrap >Total<br />$ {props.basket.total}</Typography>
          </div>
          <div className={classes.items}>
          {props.basket.items.map((item,key) => (
            <BasketItem item={item} key={key} 
              onClickDelete={() => { props.basketRemoveItem(props.basket.id, item.productId) }}
              onClickQuantityMinus={() => { if(item.quantity > 1) { item.quantity -= 1; console.log(item); props.basketAddItem(props.basket.id, item) }}}
              onClickQuantityPlus={() => { item.quantity += 1; console.log(item); props.basketAddItem(props.basket.id, item) }} />
          ))}
          </div>
        </div>
        <div className={classes.checkout}>
          checkout
          </div>
      </Drawer>
    </React.Fragment >
  );
  // }
}
const mapStateToProps = state => ({ basket: state.main.basket })
const mapDispatchToProps = dispatch => bindActionCreators({ basketAddItem, basketRemoveItem }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BasketDrawer);
//export default withRouter(withStyles(styles)(BasketDrawer));