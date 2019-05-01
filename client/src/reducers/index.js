import { combineReducers } from 'redux';

import authReducer from './authReducer';
import watchlistReducer from './watchlistReducer';

export default combineReducers({
	auth: authReducer,
	watchlist: watchlistReducer
});
