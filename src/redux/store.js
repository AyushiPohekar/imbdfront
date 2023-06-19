import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Import your reducers
import authReducer from './reducers/authreducer';

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create the store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
