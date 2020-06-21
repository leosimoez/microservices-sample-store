import axios from 'axios';

const CATALOG_BASE_URL = "http://localhost:8080";
const BASKET_BASE_URL = "http://localhost:8090";

export function readBasket(basketId) {

  const request = axios.get(`${BASKET_BASE_URL}/basket/${basketId}`)
  
  return {
    type: 'BASKET_FETCHED',
    payload: request
  }
}


export function createBasket() {
  const basketId = sessionStorage.getItem('@spa-shopping-cart/basketId')
  let request
  if (basketId) {
    request = axios.get(`${BASKET_BASE_URL}/basket/${basketId}`)
  } else {
    request = axios.post(`${BASKET_BASE_URL}/basket`)
  }
  return {
    type: 'BASKET_CREATED',
    payload: request
  }
}

export function basketAddItem(basketId, itemData) {
  // console.log(itemData)
  const request = axios.post(`${BASKET_BASE_URL}/basket/${basketId}/item`, itemData)
  return {
    type: 'BASKET_ITEM_CHANGED',
    payload: request
  }
}

//chain actions
// https://stackoverflow.com/questions/51987573/how-do-i-chain-actions-with-redux-promise-middleware
//install redux-thunk
export function basketRemoveItem(basketId, itemId) {

  return (dispatch) => {
    axios.delete(`${BASKET_BASE_URL}/basket/${basketId}/item/${itemId}`)
      .then((res) => {
        dispatch(createBasket())
      })
  }
}

export function getTypes() {
  const request = axios.get(`${CATALOG_BASE_URL}/type`)
  return {
    type: 'MAIN_TYPES_FETCHED',
    payload: request
  }
}

export function getBrands() {
  const request = axios.get(`${CATALOG_BASE_URL}/brand`)
  return {
    type: 'MAIN_BRANDS_FETCHED',
    payload: request
  }
}

export function getProducts(search, type, brand, page, size) {
  console.log(search)
  if (type) {
    return getProductsByType(type, page, size)
  }

  if (brand) {
    return getProductsByBrand(brand, page, size)
  }

  return getProductsByText(search, page, size)

}

const getProductsByText = (search, page, size) => {
  const query = search ? `q=${search}` : '';
  const request = axios.get(`${CATALOG_BASE_URL}/product?${query}&page=${page}&size=${size}`)
  return {
    type: 'MAIN_PRODUCTS_FETCHED',
    payload: request
  }
}

const getProductsByType = (type, page, size) => {
  const request = axios.get(`${CATALOG_BASE_URL}/type/${type}/products?page=${page}&size=${size}`)
  return {
    type: 'MAIN_PRODUCTS_FETCHED',
    payload: request
  }
}

const getProductsByBrand = (brand, page,size) => {
  const request = axios.get(`${CATALOG_BASE_URL}/brand/${brand}/products?page=${page}&size=${size}`)
  return {
    type: 'MAIN_PRODUCTS_FETCHED',
    payload: request
  }
}