import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getallMovies } from "../../redux/actions";
import Movies from "../../Components/Movies/Movies";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../Components/Context/SearchContext";

const HomePage = () => {
  const [query, setQuery]=useSearch();
  const auth=localStorage.getItem("auth")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallMovies);
  }, []);
  const navigate=useNavigate();
  const allMovies = useSelector((state) => state.movie.movies);
  console.log(allMovies);

  const handleDelete=(movieId)=>{
    if(auth){
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
        {allMovies?.filter(eq=>{if(query===''){return eq;}
      else if(eq.original_title.toLowerCase().includes(query.toLowerCase()))
      {return eq;}
      })
      .map((mv) => (
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
              onClick={() => navigate(`/movies/edit/${mv.movieId}`)}
              aria-label="Movie-edit"
            >
              <EditIcon />
            </IconButton>
          }
        />
      ))}
          {/* {allMovies?.map((mv) => (
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
          ))} */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
