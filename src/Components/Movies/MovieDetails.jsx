import React, { useEffect } from "react";
import { getActorsById, getallMoviesById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Movies.css";
import Navbar from "../Navbar/Navbar";
import ActorDetail from "../Actors/ActorDetail";

const MovieDetails = () => {
  const navigate = useNavigate();

  const { movieId } = useParams();
  console.log(movieId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallMoviesById(movieId));
  }, [movieId]);

  const selectedMovie = useSelector((state) => state.movie);
  const singleMovie = selectedMovie?.selectedMovie;

  //get actor by id
  const handleactorClick = (actor) => {
    navigate(`/actordetail`, { state: { actor } });
  };
  const handleproducerClick = () => {
    navigate(`/producerdetail`, { state: { singleMovie } });
  };


  const styles = {
    color: singleMovie?.vote_average > 8 ? "green" : "red",
  };




  return (
    <>
      <Navbar />
      <button className="Backbtn" onClick={()=>navigate(-1)}>Back</button>
      <div className="MovieDetailContainer">
       
        <div className="Detail_firstDiv">
          <div className="Detail_firstDiv_left">
            <h1>{singleMovie?.original_title}</h1>
            <p>{singleMovie?.releaseDate}</p>
          </div>
          <div className="Detail_SecondDiv_Right">
            <p className="rating">ImDb rating</p>
            <p className="ratingVal" style={styles}>{singleMovie?.vote_average}🌟</p>
          </div>
        </div>
        <div className="MovieDetailPosterDiv">
          <img className="MovieDetailPoster" src={singleMovie?.poster_path} />
        </div>
        <div className="genreDiv">
          <p className="generes">
            {singleMovie?.genres?.map((genere) => {
              return <span className="genere">{genere}</span>;
            })}
          </p>
          <p className="MovieDetailOverview">{singleMovie?.overview}</p>
          <p className="MovieDetailActor">
            <span>Actors:</span>
            {singleMovie?.actors?.map((actor) => {
              return (
                <span
                  className="actorNames"
                  onClick={() => handleactorClick(actor)}
                >
                  {actor?.name}
                </span>
              );
            })}
          </p>
          <p className="MovieDetailActor">
            <span>Producers:</span>
            <span className="actorNames" onClick={handleproducerClick}>
              {singleMovie?.producer?.name}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
