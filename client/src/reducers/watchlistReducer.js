import _ from 'lodash';

import { FETCH_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../actions/types';

export default function(state = null, action) {
	// console.log('watchlist reducer called!');

	switch (action.type) {
		case FETCH_WATCHLIST:
			// console.log('inside fetchWatchlist action in reducer');
			return action.payload || false;
		case REMOVE_FROM_WATCHLIST:
			// console.log('inside removeFromWatchlist action in reducer', action);
			// console.log(
			// 	'inside removeFromWatchlist action in reducer, movieId',
			// 	action.payload.movieId
			// );
			//
			// console.log('state', state);

			let newState = _.cloneDeep(state);

			newState.forEach(movie => {
				if (movie.id === action.payload.movieId) {
					movie.onWatchlist = false;
				}
			});

			return newState;
		default:
			// console.log('called watchlistReducer with default!', state);
			return state;
	}
}
