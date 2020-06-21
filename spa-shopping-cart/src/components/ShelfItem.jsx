import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import { Paper } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({

  //http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
  title: {
    fontSize: 14,
    /* hide text if it more than N lines  */
    overflow: 'hidden',
    /* for set '...' in absolute position */
    position: 'relative',
    /* use this value to count block height */
    lineHeight: '1.2em',
    /* max-height = line-height (1.2) * lines max number (3) */
    maxHeight: '2.4em',
    /* fix problem when last visible word doesn't adjoin right side  */
    textAlign: 'center',
    /* place for '...' */
    marginRight: '-1em',
    paddingRight: '2em',
    // whiteSpace: 'nowrap'
    '&::before': {
      content: '"..."',
      textAlign: 'left',
      /* absolute position */
      position: 'absolute',
      /* set position to right bottom corner of block */
      right: '1.5em',
      bottom: 0
    },
    '&::after': {
      /* points in the end */
      content: '',
      /* absolute position */
      position: 'absolute',
      /* set position to right bottom corner of text */
      right: 0,
      /* set width and height */
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      /* bg color = bg color under block */
      background: 'white'
    }
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    // width: 200,
    maxHeight: 310,

    padding: '10px',
    margin: '20px',
    display: 'inline-block',
    [theme.breakpoints.up('sm')]: {
      width: 240,
    },
  },
  thumbContainer: {
    height: '125px',
    width: '100%',
    justifyContent: 'center',
    verticalAlign: 'middle'
  },
  thumb: {
      display: 'inline-block',
      maxWidth:'180px',
      maxHeight:'125px',
      width: 'auto',
      height: 'auto'
  }
}));

const ShelfIItem = props => {

  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper} key={props.product.id}>
      <div className={classes.thumbContainer}>
      {/* <img src="https://images-americanas.b2w.io/produtos/01/00/img/360564/1/360564168G1.jpg" width="125" height="125" /> */}
      <img src={props.product.pictureUri} width="125" height="125" className={classes.thumb} alt="product" />
      </div>
      <Typography color="textPrimary" gutterBottom className={classes.title}>
        {props.product.name}
      </Typography>
      <Rating name="read-only" value={4} readOnly />
      <Typography variant="h6" component="h6">
        $ {props.product.price}
        </Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => props.addToBasket(props.product)}
        startIcon={<ShoppingBasketIcon />}
      >
        Add to Cart
      </Button>
    </Paper>
  );

}

export default withRouter(withStyles(useStyles)(ShelfIItem));