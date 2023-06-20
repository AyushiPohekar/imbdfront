import * as actionTypes from '../actions/type'


export const moviesReducer=(state=[],action)=>{

    switch(action.type){
      
        case actionTypes.FETCH_MOVIES:
            return action.payload
      


        default:
            return state
    }
}