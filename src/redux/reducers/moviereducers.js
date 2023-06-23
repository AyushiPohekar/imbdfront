import * as actionTypes from "../actions/type";

export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES:
      return action.payload;
    case actionTypes.FETCH_SINGLE_MOVIES:
      const selectedMovie = action.payload.movie;
      console.log("selected movie inside reducers", action.payload.movie);
      return {
        ...state,
        selectedMovie,
      };
      case actionTypes.CREATE_MOVIE:
        return [action.payload, ...state]
    // case actionTypes.UPDATE_TODO:
    // return state.map(todo => (
    //     todo._id === action.payload._id ? { ...todo, data: action.payload.data } : todo
    // ))
    case actionTypes.DELETE_MOVIE:
      const movieId = action.payload.movieId;

      const updatedMovies = state.movies.filter(
        (movie) => movie.movieId !== movieId
      );
      //console.log(updatedMovies)
      return {
        ...state,
        movies: updatedMovies,
      };

    default:
      return state;
  }
};
