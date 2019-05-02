import _ from 'lodash';

import {
	FETCH_DISCOVER,
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST
} from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_DISCOVER:
			// console.log('inside fetch_discover in discoverReducer');
			return action.payload || false;
		case ADD_TO_WATCHLIST:
			console.log(
				'inside add_to_watchlist in discoverReducer',
				action.payload.movieId
			);

			let addedState = _.cloneDeep(state);

			addedState.forEach(movie => {
				if (movie.id === action.payload.movieId) {
					movie.onWatchlist = true;
				}
			});

			return addedState;
		case REMOVE_FROM_WATCHLIST:
			// console.log('inside remove_from_watchlist inside discoverReducer');

			let removedState = _.cloneDeep(state);

			removedState.forEach(movie => {
				if (movie.id === action.payload.movieId) {
					movie.onWatchlist = false;
				}
			});

			return removedState;
		default:
			return state;
	}
}
