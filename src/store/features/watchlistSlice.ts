import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface WatchlistState {
  watchlist: Movie[];
}

const initialState: WatchlistState = {
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.watchlist.push(action.payload);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter((movie) => movie.imdbID !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
  },
});

export const { addMovie, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;
