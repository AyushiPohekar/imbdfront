import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';



import { composeWithDevTools } from '@redux-devtools/extension';
import { moviesReducer } from './reducers/moviereducers';


const rootReducer = combineReducers({
  movie:moviesReducer,
});
const middleware=[thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;





