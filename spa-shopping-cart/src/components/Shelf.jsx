import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from '@material-ui/lab/Pagination';
import ShelfItem from './ShelfItem';

const styles = makeStyles((theme) => ({



  shelfContainer: {
    width: '70%',
    margin: '2em auto',
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      width: '95%',
    },
  },

  pagination: {
    margin: '10px auto',
    display: 'inline-block',
    justifyContent: 'center',
  }

}));


const Shelf = props => {

  const classes = styles();

  // const sampleData = Array.from({ length: 10 }, (_, id) => ({ id }))

  // console.log(sampleData)

  const changePagination = (event, value) => {
    props.setPage(value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.shelfContainer}>
        <div>
          {props.productsList.content.map((item,key) => (
            <ShelfItem product={item} key={key} addToBasket={props.addToBasket} />
          ))}
        </div>
        {/* https://pt-br.reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator */}
        {props.productsList.totalPages > 0 &&
        <div>
          <Pagination count={props.productsList.totalPages} page={props.productsList.number+1} color="primary" size="large" className={classes.pagination} onChange={changePagination} />
        </div>
        }
      </div>
    </React.Fragment >
  );
  // }
}

export default withRouter(withStyles(styles)(Shelf));