import {combineReducers} from 'redux';
import productsReducer from './Products';

const allReducers = combineReducers({
  productsInfo: productsReducer,
});

export default allReducers;
