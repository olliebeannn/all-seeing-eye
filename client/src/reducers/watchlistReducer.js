// import axios from 'axios';

import { FETCH_WATCHLIST } from '../actions/types';

export default function(state = null, action) {
	// console.log('watchlist reducer called!');

	switch (action.type) {
		case FETCH_WATCHLIST:
			console.log('inside fetchWatchlist action in reducer');

			return action.payload || false;
		// axios
		// 	.get('/api/watchlist/fetch')
		// 	.then(res => {
		// 		// console.log(res);
		//
		// 		const selectedAttributes = [
		// 			'id',
		// 			'title',
		// 			'overview',
		// 			'vote_average',
		// 			'genre_ids',
		// 			'onWatchlist'
		// 		];
		//
		// 		let newMoviesState = [];
		//
		// 		res.data.forEach(movie => {
		// 			newMoviesState.push(
		// 				_.cloneDeep(_.pick(movie, selectedAttributes))
		// 			);
		// 		});
		//
		// 		console.log('newMoviesState', newMoviesState);
		//
		// 		return newMoviesState;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		return state;
		// 	});
		default:
			console.log('called watchlistReducer with default!', state);
			return state;
	}
}
