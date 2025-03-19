import { useState } from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import './App.css';


function App() {

  const [selectedMovie, setSelectedMovie]=useState(null);
  const [editedMovie,setEditedMovie]=useState(null);
  const [newMovie,setNewMovie]=useState(null);
  
  const movieClicked = (movie,isEdit) =>{
    if (isEdit){
      setSelectedMovie(null);
      setEditedMovie(movie)
    }else{
      setSelectedMovie(movie);
      setEditedMovie(null);
    }
  }

  const createNewMovie = () =>{
    setSelectedMovie(null);
    setEditedMovie({title:'',description:''})
  }
  
  return (
    <div className="App">
      <header className="App-header p-10 border-b-2 border-orange-300 mb-5">
       <h1>Movie Rater</h1>
      </header>
      <div className='grid grid-cols-2'>
        <div>
        <MovieList movieClicked={movieClicked} newMovie={newMovie}/>
        <button onClick={() => createNewMovie()}>Craete New Movie</button>
        </div>
        
         
        <MovieDetails movie={selectedMovie} updateMovie={setSelectedMovie}/>
        {editedMovie && <MovieForm  movie={editedMovie} updateMovie={setNewMovie}/>}
       </div>
    </div>
  );
}

export default App;
