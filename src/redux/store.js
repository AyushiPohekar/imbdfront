import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';



import { composeWithDevTools } from '@redux-devtools/extension';
import { moviesReducer } from './reducers/moviereducers';
import { actorsReducer } from './reducers/actorreducers';
import { producersReducer } from './reducers/producerreducers';


const rootReducer = combineReducers({
  movie:moviesReducer,
  actor:actorsReducer,
  producer:producersReducer
});
const middleware=[thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;





