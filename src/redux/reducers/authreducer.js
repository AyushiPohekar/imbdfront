import { LOGIN, LOGOUT } from "../actions/type";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user") || null),
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload,
      };
    case LOGOUT:
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
