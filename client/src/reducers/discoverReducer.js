import _ from 'lodash';

import { FETCH_DISCOVER, REMOVE_FROM_WATCHLIST } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_DISCOVER:
			// console.log('inside fetch_discover in discoverReducer');
			return action.payload || false;
		case REMOVE_FROM_WATCHLIST:
			// console.log('inside remove_from_watchlist inside discoverReducer');

			let newState = _.cloneDeep(state);

			newState.forEach(movie => {
				if (movie.id === action.payload.movieId) {
					movie.onWatchlist = false;
				}
			});

			return newState;
		default:
			return state;
	}
}
