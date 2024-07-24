import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMovie } from '../store/features/watchlistSlice';
import Loading from '@/pages/Loading';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [addedMovies, setAddedMovies] = useState<string[]>([]);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const dispatch = useDispatch();

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when search starts
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=ad84c69d`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  const handleAddMovie = (movie: any) => {
    dispatch(addMovie(movie));
    setWatchlistCount(prevCount => prevCount + 1);
    setAddedMovies([...addedMovies, movie.imdbID]);
  };


  return (
    <div className="mt-2 flex flex-col items-center">
      <form onSubmit={searchMovies} className="w-full max-w-lg mb-6 flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </form>

      <Link to="/watchlist">
        <button className='inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
          Go to Watchlist ({watchlistCount})
        </button>
      </Link>

      {loading ? (
        <div className=""><Loading/></div> // Show loading indicator
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl">
          {movies.map((movie: any) => (
            <div
              key={movie.imdbID}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img src={movie.Poster} alt={movie.Title} className="w-full h-auto rounded-md" />
              <h3 className="mt-4 text-lg font-bold text-center text-rose-600">{movie.Title}</h3>
              <p className="text-gray-600">{movie.Year}</p>
              <button
              onClick={() => handleAddMovie(movie)}
              className={`mt-4 px-4 py-2 w-full text-white rounded-md focus:outline-none ${addedMovies.includes(movie.imdbID) ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {addedMovies.includes(movie.imdbID) ? 'Added' : 'Add to Watchlist'}
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
