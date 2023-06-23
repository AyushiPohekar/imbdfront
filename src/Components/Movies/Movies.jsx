import { Card, CardContent, IconButton, CardActions } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Movies.css";

const Movies = ({ movie, movieId, deletebutton,editbutton }) => {
  //console.log(movieId)
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const styles = {
    color: movie.vote_average > 8 ? "green" : "red",
  };

  // console.log(movie.poster_path[0])
  return (
    <Card className="Movie-container" sx={{ height: "min-content" }}>
      <img
        className="Movie-poster"
        src={movie.poster_path}
        alt={movie.original_title}
      />
      <CardContent>
        <div className="Movie-individual">
          <h2 className="Movie-name">{movie.original_title} </h2>
          <IconButton
            color="primary"
            onClick={() => navigate(`/movies/${movieId}`)}
            aria-label="Movie-Details"
          >
            <InfoIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setShow(!show)}
            aria-label="Summary"
          >
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>

          <p style={styles} className="Movie-rating">
            &#11088;{movie.vote_average}
          </p>
        </div>

        {show ? <p className="Movie-summary">{movie.overview}</p> : null}
      </CardContent>
      <CardActions>
        <div>
          {" "}
          <span>{deletebutton} {editbutton}</span>
        </div>
      </CardActions>
    </Card>
  );
};

export default Movies;
