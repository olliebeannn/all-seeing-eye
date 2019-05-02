import { combineReducers } from 'redux';

import authReducer from './authReducer';
import watchlistReducer from './watchlistReducer';
import discoverReducer from './discoverReducer';

export default combineReducers({
	auth: authReducer,
	watchlist: watchlistReducer,
	discoverList: discoverReducer
});
