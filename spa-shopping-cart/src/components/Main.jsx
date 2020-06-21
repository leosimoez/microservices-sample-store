import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";
import BasketDrawer from "./BasketDrawer"
import MenuDrawer from "./MenuDrawer"
import Shelf from "./Shelf"
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { getTypes, getBrands, getProducts, createBasket, basketAddItem, basketRemoveItem } from './MainActions';

// const styles = theme => ({

// });

class Main extends Component {


  constructor(props) {
    super(props)
    this.toggleCartVisible = this.toggleCartVisible.bind(this);
    this.toggleMenuVisible = this.toggleMenuVisible.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.setPage = this.setPage.bind(this)
    this.setType = this.setType.bind(this)
    this.setBrand = this.setBrand.bind(this)
    this.addToBasket = this.addToBasket.bind(this)
  }

  componentWillMount() {
    this.props.createBasket()
    this.props.getBrands()
    this.props.getTypes()
    this.props.getProducts(this.state.filter.search,
      this.state.filter.type,
      this.state.filter.brand,
      this.state.filter.page,
      this.state.filter.size)
  }

  state = {
    cartIsVisible: false,
    menuIsVisible: false,
    filter: {
      search: null,
      brand: null,
      type: null,
      page: 0,
      size: 20,
      // paged: true,
      // sort: { unsorted: true, sorted: false, empty: true },
      // unpaged: false
    }
  };

  toggleCartVisible = () => {
    this.setState({
      ...this.state,
      cartIsVisible: !this.state.cartIsVisible
    })
  }

  toggleMenuVisible = () => {
    this.setState({
      ...this.state,
      menuIsVisible: !this.state.menuIsVisible
    })
  }

  doSearch = (searchText) => {
    console.log("search"+searchText)
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        search: searchText,
        brand: null,
        type: null,
        page: 0
      }
    }, () => {
      this.props.getProducts(
        this.state.filter.search,
        this.state.filter.type,
        this.state.filter.brand,
        this.state.filter.page,
        this.state.filter.size,
      )
    })
  }

  setPage = (page) => {
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        page: page - 1
      }
    }, () => {
      this.props.getProducts(
        this.state.filter.search,
        this.state.filter.type,
        this.state.filter.brand,
        this.state.filter.page,
        this.state.filter.size,
      )
    })
  }

  setBrand = (brand) => {
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        brand: brand,
        type: null,
        search: null,
        page: 0
      }
    }, () => {
      this.props.getProducts(
        this.state.filter.search,
        this.state.filter.type,
        this.state.filter.brand,
        this.state.filter.page,
        this.state.filter.size,
      )
    })
  }

  setType = (type) => {
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        brand: null,
        type: type,
        search: null,
        page: 0
      }
    }, () => {
      this.props.getProducts(
        this.state.filter.search,
        this.state.filter.type,
        this.state.filter.brand,
        this.state.filter.page,
        this.state.filter.size,
      )
    })
  }

  addToBasket = (product) => {
    // console.log(this.props.basket)
    let itemData = {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: 1,
      pictureUri: product.pictureUri  
    }
    // console.log(this.props.basket)
    this.props.basketAddItem(this.props.basket.id, itemData)

  }

  render() {
    // console.log(this.addToBasket)
    return (

      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Navbar toggleCartVisible={this.toggleCartVisible} toggleMenuVisible={this.toggleMenuVisible} doSearch={this.doSearch} basketTotalItems={this.props.basket.items.length} />
          <BasketDrawer toggleCartVisible={this.toggleCartVisible} cartIsVisible={this.state.cartIsVisible} />
          <MenuDrawer toggleMenuVisible={this.toggleMenuVisible} menuIsVisible={this.state.menuIsVisible}
            brandsList={this.props.brandsList}
            typesList={this.props.typesList}
            setBrand={this.setBrand}
            setType={this.setType}
            typeSelected={this.state.filter.type}
            brandSelected={this.state.filter.brand} />
          <Shelf productsList={this.props.productsList} setPage={this.setPage} addToBasket={this.addToBasket} />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({ brandsList: state.main.brandsList, typesList: state.main.typesList, productsList: state.main.productsList, basket: state.main.basket })
const mapDispatchToProps = dispatch => bindActionCreators({ getTypes, getBrands, getProducts, createBasket, basketAddItem, basketRemoveItem }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main);

