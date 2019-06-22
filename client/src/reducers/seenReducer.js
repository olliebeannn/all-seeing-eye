import _ from 'lodash';

import {
  FETCH_SEEN,
  REMOVE_FROM_SEEN,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SEEN:
      return action.payload || false;
    case REMOVE_FROM_SEEN:
      let newState = _.cloneDeep(state);

      newState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onSeen = false;
        }
      });

      return newState;
    case ADD_TO_WATCHLIST:
      let watchlistAddedState = _.cloneDeep(state);

      watchlistAddedState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onWatchlist = true;
        }
      });

      return watchlistAddedState;
    case REMOVE_FROM_WATCHLIST:
      let watchlistRemovedState = _.cloneDeep(state);

      watchlistRemovedState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onWatchlist = false;
        }
      });

      return watchlistRemovedState;
    default:
      return state;
  }
}
