import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, Paper } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = makeStyles((theme) => ({

  centerVertical: {
    verticalAlign: 'middle',
    // alignmentBaseline: 'middle',
    height: '48px',
    // backgroundColor: 'red'
  },
  thumb: {
    display: 'inline-block',
    maxWidth: '60px',
    maxHeight: '60px',
    width: 'auto',
    height: 'auto'
  }

}));

const BasketItem = props => {

  const classes = styles();

  return (
    <Paper elevation={3} style={{ padding: "10px", margin: '10px 0' }}>
      <Box display="flex" flexWrap="nowrap">
        <img src={props.item.pictureUri} width="60" height="60" alt="product" className={classes.thumb} />
        <Typography color="textPrimary">
          {props.item.productName}
        </Typography>
      </Box>
      <Divider />
      <Grid style={{ display: 'flex', flexGrow: 1 }}>
        <Grid item xs={2}>
          <IconButton color="secondary" onClick={props.onClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="secondary" onClick={props.onClickQuantityMinus}>
            <RemoveCircleIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1} className={classes.centerVertical}>
          <p>{props.item.quantity}</p>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="secondary" onClick={props.onClickQuantityPlus}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2} className={classes.centerVertical}>
          <p>$ {props.item.unitPrice}</p>
        </Grid>
        <Grid item xs={3} className={classes.centerVertical}>
          <p>$ {props.item.itemValue}</p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withRouter(withStyles(styles)(BasketItem));