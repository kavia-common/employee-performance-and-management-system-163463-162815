import { combineReducers, createStore } from 'redux';
import authReducer from './authSlice';
import dataReducer from './dataSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

const store = createStore(
  rootReducer,
  // Redux DevTools if available
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
);

export default store;
