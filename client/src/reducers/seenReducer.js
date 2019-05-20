import _ from 'lodash';

import { FETCH_SEEN, REMOVE_FROM_SEEN } from '../actions/types';

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
    default:
      return state;
  }
}
