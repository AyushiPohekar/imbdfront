import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

import MovieDetails from './Components/Movies/MovieDetails';
import EditMovie from './Components/Movies/EditMovie';
import AddMovie from './Components/Movies/AddMovie';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/movies/:movieId" element={<MovieDetails/>}/>
      <Route path="/movies/edit/:movieId" element={<EditMovie/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/addmovie" element={<AddMovie/>}/>
     </Routes>
    </div>
  );
}

export default App;
