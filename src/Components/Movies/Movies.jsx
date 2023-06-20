import { Card, CardContent, IconButton,CardActions } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Movies.css"

const Movies = ({movie,movieId}) => {
  const [show, setShow] = useState(true);
  const parastyles = {
    display: show ? "block" : "none",
  };

  const navigate=useNavigate();

  const styles = {
    color: movie.vote_average > 8 ? "green" : "red",
  };

  console.log(movie.poster_path[0])
  return (
    <Card className='Movie-container' sx={{height:"min-content"}}>
    <img className='Movie-poster' src={movie.poster_path} alt={movie.original_title} />
   <CardContent>
    <div className='Movie-individual'>
      <h2 className='Movie-name'>{movie.original_title}
      <IconButton color="primary" onClick={()=>navigate(`/movies/${movieId}`)} aria-label="Movie-Details">
   <InfoIcon />
  </IconButton>
  <IconButton color="primary" onClick={() => setShow(!show)} aria-label="Summary">
   {show?< ExpandLessIcon/> :<ExpandMoreIcon/>}
  </IconButton>
  </h2>
      <p style={styles} className='Movie-rating'>&#11088;{movie.vote_average}</p></div>
    

    
    {/* conditional styling */}
    {/* <p style={parastyles} className='Movie-summary'>{movies.summary}</p> */}
    {show ? <p className='Movie-summary'>{movie.overview}</p> : null}
    </CardContent>
    <CardActions>
    {/* <Counter /> {deletebutton} {editbutton} */}
    <div>Counter delete edit</div>
    </CardActions>

  </Card>
  )
}

export default Movies