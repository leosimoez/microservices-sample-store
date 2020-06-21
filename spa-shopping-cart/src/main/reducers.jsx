import { combineReducers } from 'redux';
import MainReducer from '../components/MainReducer'

const reducers = combineReducers({
  main: MainReducer
    // main: () => ({menuVisible: true, cart: {visible: false}, categorySelected: null, searchText: null})
});

export default reducers