import { combineReducers } from 'redux';

import authReducer from './authReducer';
import watchlistReducer from './watchlistReducer';
import discoverReducer from './discoverReducer';
import toastReducer from './toastReducer';

export default combineReducers({
	auth: authReducer,
	watchlist: watchlistReducer,
	discoverList: discoverReducer,
	toasts: toastReducer
});
