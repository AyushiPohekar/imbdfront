import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getallMovies } from "../../redux/actions";
import Movies from "../../Components/Movies/Movies";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user=localStorage.getItem("user")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallMovies);
  }, []);
  const navigate=useNavigate();
  const allMovies = useSelector((state) => state.movie.movies);
  console.log(allMovies);

  const handleDelete=(movieId)=>{
    if(user){
      dispatch(deleteMovie(movieId));
      //window.location.reload();
    }
    else{
  navigate("/login")
    }
    
  }
 
  return (
    <>
      <Navbar />

      <div>
        <div className="Movie-list">
          {allMovies?.map((mv) => (
            <Movies
              key={mv.movieId}
              movie={mv}
              movieId={mv.movieId}
              deletebutton={
                <IconButton
                  color="error"
                  onClick={() => handleDelete(mv.movieId)}
                  aria-label="Movie-Delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
              editbutton={
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/movies/edit/${mv.movieid}`)}
                  aria-label="Movie-edit"
                >
                  <EditIcon />
                </IconButton>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
