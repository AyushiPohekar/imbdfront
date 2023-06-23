import * as actionTypes from "../actions/type";

export const producersReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCERS:
          return action.payload;
          case actionTypes.GET_SINGLEPRODUCER:
            const selectedProducer = action.payload.producer;
            console.log("selected producer inside reducers", action.payload.producer);
            return {
              ...state,
              selectedProducer,
            };
           
       
    
        default:
          return state;
      } 
}