import axios from 'axios';
import _ from 'lodash';

import {
  FETCH_USER,
  FETCH_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  FETCH_SEEN,
  ADD_TO_SEEN,
  REMOVE_FROM_SEEN,
  FETCH_DISCOVER,
  ADD_TOAST,
  REMOVE_TOAST
} from './types';

import selectedAttributes from '../utils/selectedAttributes';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentUser');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchWatchlist = () => async dispatch => {
  const res = await axios.get('/api/watchlist/fetch');
  dispatch({ type: FETCH_WATCHLIST, payload: res.data });
};

export const addToWatchlist = movieId => async dispatch => {
  const response = await axios.post('/api/update-list', {
    movieId: movieId,
    action: 'add_watchlist'
  });

  dispatch({ type: ADD_TO_WATCHLIST, payload: { movieId: movieId } });
};

export const removeFromWatchlist = movieId => async dispatch => {
  const response = await axios.post('/api/update-list', {
    movieId: movieId,
    action: 'remove_watchlist'
  });

  dispatch({ type: REMOVE_FROM_WATCHLIST, payload: { movieId: movieId } });
};

export const addToSeen = movieId => async dispatch => {
  console.log('in addToSeen action creator!');

  const response = await axios.post('/api/update-list', {
    movieId: movieId,
    action: 'add_seen'
  });

  dispatch({ type: ADD_TO_SEEN, payload: { movieId: movieId } });
};

export const removeFromSeen = movieId => async dispatch => {
  console.log('in removeFromSeen action creator!');

  const response = await axios.post('/api/update-list', {
    movieId: movieId,
    action: 'remove_seen'
  });

  dispatch({ type: REMOVE_FROM_SEEN, payload: { movieId: movieId } });
};

export const fetchSeen = () => async dispatch => {
  const response = await axios.get('/api/seen/fetch');
  dispatch({ type: FETCH_SEEN, payload: response.data });
};

export const addToast = (text, actionTaken, id) => {
  return {
    type: ADD_TOAST,
    payload: { text, actionTaken, id }
  };
};

export const removeToast = id => {
  return { type: REMOVE_TOAST, payload: { id } };
};

export const loadDiscoverMovies = page => async dispatch => {
  const response = await axios.get(`/api/discover/fetch?page=${page}`);

  let returnData = [];

  response.data.forEach(movie => {
    returnData.push(_.cloneDeep(_.pick(movie, selectedAttributes)));
  });

  dispatch({ type: FETCH_DISCOVER, payload: returnData });
};
