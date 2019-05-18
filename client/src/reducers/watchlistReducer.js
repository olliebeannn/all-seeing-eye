import _ from 'lodash';

import { FETCH_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../actions/types';

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
    default:
      return state;
  }
}
