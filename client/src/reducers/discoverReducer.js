import _ from 'lodash';

import {
  FETCH_DISCOVER,
  LOAD_DISCOVER_PAGE,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_SEEN
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_DISCOVER:
      console.log('fetch_discover', action);
      return action.payload || false;
    // case UPDATE_FILTERS:
    //   console.log('update filters!', action);
    //   return action.payload || false;
    case LOAD_DISCOVER_PAGE:
      console.log('load-discover-page', action);

      if (state) {
        let newState = [];
        state.forEach(item => newState.push(_.cloneDeep(item)));
        action.payload.forEach(item => newState.push(_.cloneDeep(item)));

        return newState;
      } else {
        return action.payload || false;
      }
    case ADD_TO_WATCHLIST:
      if (state) {
        let addedState = _.cloneDeep(state);

        addedState.forEach(movie => {
          if (movie.movieId === action.payload.movieId) {
            movie.onWatchlist = true;
          }
        });

        return addedState;
      } else {
        return state;
      }
    case REMOVE_FROM_WATCHLIST:
      // only call this if discoverState contains anything (won't happen on first loading)
      if (state) {
        let removedState = _.cloneDeep(state);

        removedState.forEach(movie => {
          if (movie.movieId === action.payload.movieId) {
            movie.onWatchlist = false;
          }
        });

        return removedState;
      } else {
        return state;
      }
    case ADD_TO_SEEN:
      if (state) {
        let addedSeenState = _.cloneDeep(state);

        addedSeenState.forEach(movie => {
          if (movie.movieId === action.payload.movieId) {
            movie.onSeen = true;
          }
        });

        return addedSeenState;
      } else {
        return state;
      }
    default:
      return state;
  }
}
