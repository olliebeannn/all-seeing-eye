import axios from 'axios';
import _ from 'lodash';

import {
	FETCH_USER,
	FETCH_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
	FETCH_DISCOVER
} from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/currentUser');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchWatchlist = () => async dispatch => {
	const res = await axios.get('/api/watchlist/fetch');

	const selectedAttributes = [
		'id',
		'title',
		'overview',
		'vote_average',
		'genre_ids',
		'onWatchlist'
	];

	let newMoviesState = [];

	console.log('inside actions.js', res);

	res.data.forEach(movie => {
		newMoviesState.push(_.cloneDeep(_.pick(movie, selectedAttributes)));
	});

	console.log('newMoviesState', newMoviesState);

	dispatch({ type: FETCH_WATCHLIST, payload: newMoviesState });
};

export const removeFromWatchlist = movieId => async dispatch => {
	const response = await axios
		.post('/api/watchlist/update', {
			movieId: movieId,
			action: 'remove'
		})
		.then(res => console.log(res));

	dispatch({ type: REMOVE_FROM_WATCHLIST, payload: { movieId: movieId } });
};

export const fetchDiscover = () => async dispatch => {
	dispatch({ type: FETCH_DISCOVER, payload: { test: 'test data' } });
};
