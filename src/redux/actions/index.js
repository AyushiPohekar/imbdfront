import axios from "axios";
// import { LOGIN, LOGOUT } from "./type";
import { API } from "../../global";
import { CREATE_MOVIE, DELETE_MOVIE, FETCH_MOVIES, FETCH_SINGLE_MOVIES, GET_ACTORS, GET_PRODUCERS, GET_SINGLEACTOR, GET_SINGLEPRODUCER, UPDATE_MOVIE } from "./type";

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
let auth=localStorage.getItem("auth")
let authuser=JSON.parse(auth)
let token=authuser?.token ;
console.log(token)

export const getallMovies=async(dispatch)=>{
    //console.log("function called")
    try {
       const res=await axios.get(`${API}/movies`);
      
       dispatch({type:FETCH_MOVIES,payload:res.data})
       // console.log(res.data)
    } catch (error) {
        console.log(`Error while getting movies`,error.message);
    }
    

}
export const getallMoviesById=(movieId)=>async(dispatch)=>{
   //console.log("insidefunction",movieId)
    try {
       const res=await axios.get(`${API}/movies/${movieId}`);
      
       dispatch({type:FETCH_SINGLE_MOVIES,payload:res.data})
        console.log(res.data)
    } catch (error) {
        console.log(`Error while getting movies`,error.message);
    }
    

}
export const deleteMovie=(movieId)=>async(dispatch)=>{

    try {
       const res=await axios.delete(`${API}/movies/${movieId}`,{
        headers: {
          Authorization:token,
        },
      });
      
       dispatch({type:DELETE_MOVIE,payload:res.data.movie})
       console.log("delete",res.data)
    } catch (error) {
        console.log(`Error while getting movies`,error.message);
    }
    

}

export const updateMovie =(movieId,data)=>async(dispatch)=>{
    try {
       const res=await axios.put(`${API}/movies/${movieId}`,{data},{
        headers: {
          Authorization:token,
        },
      });
      //  console.log(data)
        dispatch({type:UPDATE_MOVIE,payload:res.data})
       // console.log(res.data)
    } catch (error) {
        console.log(`Error while calling addnewTodoApi`,error.message);
    }
}

export const addnewMovie=(data)=>async(dispatch)=>{
    console.log("calling addnewmovie")
    try {
       const res=await axios.post(`${API}/movies`,{data},{
        headers: {
          Authorization:token,
        },
      });
         console.log("res.data",res.data.message)
        dispatch({type:CREATE_MOVIE,payload:res.data})
        
    } catch (error) {
        console.log(`Error while calling addnewTodoApi`,error.message);
    }
    

}


//Actors

//get All Actors
export const getallActors=async(dispatch)=>{
    //console.log("function called")
    try {
       const res=await axios.get(`${API}/actors`);
      
       dispatch({type:GET_ACTORS,payload:res.data})
     console.log(res.data)
    } catch (error) {
        console.log(`Error while getting actors`,error.message);
    }
    

}

//get Actors by Id

export const getActorsById=(id)=>async(dispatch)=>{
    //console.log("insidefunction",movieId)
     try {
        const res=await axios.get(`${API}/actors/${id}`);
       
        dispatch({type:GET_SINGLEACTOR,payload:res.data})
         console.log(res.data)
     } catch (error) {
         console.log(`Error while getting movies`,error.message);
     }
     
 
 }






//get All Producers
export const getallProducers=async(dispatch)=>{
    //console.log("function called")
    try {
       const res=await axios.get(`${API}/producers`);
      
       dispatch({type:GET_PRODUCERS,payload:res.data})
     console.log(res.data)
    } catch (error) {
        console.log(`Error while getting producers`,error.message);
    }
    

}

export const getProducersById=(id)=>async(dispatch)=>{
    //console.log("insidefunction",movieId)
     try {
        const res=await axios.get(`${API}/producers/${id}`);
       
        dispatch({type:GET_SINGLEPRODUCER,payload:res.data})
         console.log(res.data)
     } catch (error) {
         console.log(`Error while getting movies`,error.message);
     }
     
 
 }