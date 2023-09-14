import {chatReducer, userReducer} from './modules';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});
