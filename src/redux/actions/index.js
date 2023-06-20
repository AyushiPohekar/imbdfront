import axios from "axios";
// import { LOGIN, LOGOUT } from "./type";
import { API } from "../../global";
import { FETCH_MOVIES } from "./type";

// // Action creators
// export const login = (username, password) => {
//     // Perform any necessary API calls or logic here
//     // For simplicity, we'll assume successful login with hardcoded user data
//     return {
//       type: LOGIN,
//       payload: {
//         user: { username: username },
//       },
//     };
//   };
  
//   export const logout = () => {
//     return {
//       type: LOGOUT,
//     };
//   };
  
//   export const signup = (username, password) => {
   
//     return {
//       type: SIGNUP,
//       payload: {
//         user: { username: username },
//       },
//     };
//   };


// export const signupController=(data)=>async(dispatch)=>{
//   try {//console.log("data",{data})
//      const res=await axios.post(`${API}/auth/register`,data);
    
//       dispatch({type:SIGNUP,payload:res.data})
    
//   } catch (error) {
//       console.log(`Error while calling signupApi`,error.message);
//   }
  

// }

export const getallMovies=async(dispatch)=>{
    console.log("function called")
    try {
       const res=await axios.get(`${API}/movies`);
      
       dispatch({type:FETCH_MOVIES,payload:res.data})
        console.log(res)
    } catch (error) {
        console.log(`Error while getting movies`,error.message);
    }
    

}