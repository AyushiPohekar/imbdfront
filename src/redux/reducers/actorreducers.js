import * as actionTypes from "../actions/type";

export const actorsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_ACTORS:
          return action.payload;
          case actionTypes.GET_SINGLEACTOR:
            const selectedActor = action.payload.actor;
            console.log("selected actor inside reducers", action.payload.actor);
            return {
              ...state,
              selectedActor,
            };
           
    
        default:
          return state;
      } 
}