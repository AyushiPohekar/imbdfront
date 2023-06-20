import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getallMovies } from '../../redux/actions';
import Movies from '../../Components/Movies/Movies';


const HomePage = () => {
  const dispatch = useDispatch();

 useEffect(()=>{
  dispatch(getallMovies);
 },[])

  const allMovies = useSelector((state) => state.movie.movies);
  //console.log(allMovies)
  return (
    <>
   <Navbar/>
   
   {/* <div>
      <div className="Movie-list">
        {allMovies.map((mv) => (
          <Movies
            key={mv.movieId}
            movie={mv}
            id={mv.movieId}
            
    //         deletebutton={
    // <IconButton color="error" onClick={()=>deleteMovie(mv.id)} aria-label="Movie-Delete">
    //  <DeleteIcon  />
    // </IconButton>
    //         }
    //         editbutton={
    //           <IconButton color="primary" onClick={() => navigate(`/movies/edit/${mv.id}`)} aria-label="Movie-edit">
    //  < EditIcon />
    // </IconButton>
    //         }
            

            
           
          />
        ))}
      </div>
    </div> */}
    
    </>
  )
}

export default HomePage