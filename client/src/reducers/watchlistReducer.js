// import axios from 'axios';

import { FETCH_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../actions/types';

export default function(state = null, action) {
	// console.log('watchlist reducer called!');

	switch (action.type) {
		case FETCH_WATCHLIST:
			// console.log('inside fetchWatchlist action in reducer');
			return action.payload || false;
		case REMOVE_FROM_WATCHLIST:
			console.log('inside removeFromWatchlist action in reducer', action);
			return state;
		default:
			console.log('called watchlistReducer with default!', state);
			return state;
	}
}
