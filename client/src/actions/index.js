import axios from 'axios';
import _ from 'lodash';

import {
  FETCH_USER,
  FETCH_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
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
  const response = await axios.post('/api/watchlist/update', {
    movieId: movieId,
    action: 'add'
  });

  dispatch({ type: ADD_TO_WATCHLIST, payload: { movieId: movieId } });
};

export const removeFromWatchlist = movieId => async dispatch => {
  const response = await axios.post('/api/watchlist/update', {
    movieId: movieId,
    action: 'remove'
  });

  dispatch({ type: REMOVE_FROM_WATCHLIST, payload: { movieId: movieId } });
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
