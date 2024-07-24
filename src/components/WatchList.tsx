import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeMovie } from '../store/features/watchlistSlice';
import { Link } from 'react-router-dom';

const WatchList = () => {
  const watchlist = useSelector((state: RootState) => state.watchlist.watchlist);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold  font-serif ">My Watchlist</h2>
      <button className=' inline-flex h-12 mt-5 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
      <Link to="/" className="">
        Back to Search
      </Link>
      </button>
   
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="p-4 border border-gray-200 rounded-md">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
            <h3 className="mt-2 text-lg font-bold">{movie.Title}</h3>
            <p className="text-gray-600">{movie.Year}</p>
            <button
              onClick={() => dispatch(removeMovie(movie.imdbID))}
              className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-md"
            >
              Remove from Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
