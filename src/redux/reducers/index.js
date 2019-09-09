import { combineReducers } from 'redux';
import { authentication } from './user';
import { chat } from './chat';

const rootReducer = combineReducers({
  authentication,
  chat
});

export default rootReducer;