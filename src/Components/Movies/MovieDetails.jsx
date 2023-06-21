import React, { useEffect } from 'react'
import { getallMoviesById } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./Movies.css"

const MovieDetails = () => {



    const { movieId } = useParams();
    console.log(movieId)
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch( getallMoviesById(movieId));
      }, [movieId]);

  const selectedMovie = useSelector((state) => state.movie);
  const singleMovie=selectedMovie?.selectedMovie

  return (
    <div className='MovieDetailContainer'>
        <div className='Detail_firstDiv'>
            <div className='Detail_firstDiv_left'>
             <h1>{singleMovie?.original_title}</h1>
             <p>{singleMovie?.releaseDate}</p>
            </div>
            <div className='Detail_SecondDiv_Right'>
              <p>ImDb rating</p>
              <p>{singleMovie?.vote_average}</p>
            </div>
        </div>
        <div className='MovieDetailPosterDiv'>
            <img className='MovieDetailPoster' src={singleMovie?.poster_path}/>
        </div>
        <div className='genreDiv'>
            <p className='generes'>{singleMovie?.genres?.map((genere)=>{
                return(
                    <span className='genere'>
                    {genere}
                    
                    </span>
                )
            })}</p>
            <p className='MovieDetailOverview'>{singleMovie?.overview}</p>
            <p className='MovieDetailActor'>
                <span>Actors:</span>
                {singleMovie?.actors?.map((actor)=>{
                   return(
                    <span className='actorNames'>
                    {actor?.name}
                    </span>
                   )
                })}
            </p>
            <p className='MovieDetailActor'>
                <span >Producers:</span>
                <span className='actorNames'>{singleMovie?.producer?.name}</span>
            </p>
        </div>
    </div>
  )
}

export default MovieDetails