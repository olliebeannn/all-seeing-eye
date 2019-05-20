import _ from 'lodash';

import {
  FETCH_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_SEEN,
  REMOVE_FROM_SEEN
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_WATCHLIST:
      return action.payload || false;
    case REMOVE_FROM_WATCHLIST:
      let newState = _.cloneDeep(state);

      newState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onWatchlist = false;
        }
      });

      return newState;
    case ADD_TO_SEEN:
      let addSeenState = _.cloneDeep(state);

      addSeenState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onSeen = true;
        }
      });

      return addSeenState;
    case REMOVE_FROM_SEEN:
      let removeSeenState = _.cloneDeep(state);

      removeSeenState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onSeen = false;
        }
      });

      return removeSeenState;
    default:
      return state;
  }
}
