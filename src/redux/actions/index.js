import { LOGIN, LOGOUT, SIGNUP } from "./type";

// Action creators
export const login = (username, password) => {
    // Perform any necessary API calls or logic here
    // For simplicity, we'll assume successful login with hardcoded user data
    return {
      type: LOGIN,
      payload: {
        user: { username: username },
      },
    };
  };
  
  export const logout = () => {
    return {
      type: LOGOUT,
    };
  };
  
  export const signup = (username, password) => {
    // Perform any necessary API calls or logic here
    // For simplicity, we'll assume successful signup
    return {
      type: SIGNUP,
      payload: {
        user: { username: username },
      },
    };
  };