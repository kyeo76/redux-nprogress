import { combineReducers } from 'redux';
import { nprogress } from '../../../src';
import gifs from './gifs';

const rootReducer = combineReducers({
  gifs,
  nprogress
});

export default rootReducer;
