const INITIAL_STATE = {
  brandsList: { content: [] },
  typesList: { content: [] },
  productsList: { content: [] },
  basket: { items: [] }
}

export default (state = INITIAL_STATE, action) => {
  // console.log(action)
  switch (action.type) {
    case 'MAIN_TYPES_FETCHED':
      return { ...state, typesList: action.payload.data }
    case 'MAIN_BRANDS_FETCHED':
      return { ...state, brandsList: action.payload.data }
    case 'MAIN_PRODUCTS_FETCHED':
      return { ...state, productsList: action.payload.data }
    case 'BASKET_CREATED':
      sessionStorage.setItem('@spa-shopping-cart/basketId', action.payload.data.id)
      return { ...state, basket: action.payload.data }
    case 'BASKET_ITEM_CHANGED':
      return { ...state, basket: action.payload.data }
    case 'BASKET_ITEM_DELETED':
      console.log(action.payload)
      // if(action.payload.status === 204) {
        // let newItems = 
        // const basket = {...state.basket, items: state.basket.items.filter(item => item.id !== action.itemId)}
        // console.log(basket)
        // return {...state, basket: basket}
        return {...state, basket: action.payload.data}
      // }
    default:
      return state;
  }
}
