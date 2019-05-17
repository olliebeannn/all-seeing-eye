import _ from 'lodash';

import {
  FETCH_DISCOVER,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_DISCOVER:
      // If there are already movies loaded, append new movies
      // Else just return the payload, i.e. first page of movies
      if (state) {
        let newState = [];
        state.forEach(item => newState.push(_.cloneDeep(item)));
        action.payload.forEach(item => newState.push(_.cloneDeep(item)));

        return newState;
      } else {
        return action.payload || false;
      }
    case ADD_TO_WATCHLIST:
      // console.log(
      // 	'inside add_to_watchlist in discoverReducer',
      // 	action.payload.movieId
      // );

      let addedState = _.cloneDeep(state);

      addedState.forEach(movie => {
        if (movie.movieId === action.payload.movieId) {
          movie.onWatchlist = true;
        }
      });

      return addedState;
    case REMOVE_FROM_WATCHLIST:
      // console.log('inside remove_from_watchlist inside discoverReducer');
      // only call this if discoverState contains anything (won't happen on first loading)
      if (state) {
        let removedState = _.cloneDeep(state);

        removedState.forEach(movie => {
          if (movie.id === action.payload.movieId) {
            movie.onWatchlist = false;
          }
        });

        return removedState;
      } else {
        return state;
      }
    default:
      return state;
  }
}
