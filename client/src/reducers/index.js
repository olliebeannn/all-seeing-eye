import { combineReducers } from 'redux';

import authReducer from './authReducer';
import watchlistReducer from './watchlistReducer';
import discoverReducer from './discoverReducer';
import seenReducer from './seenReducer';
import toastReducer from './toastReducer';

export default combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer,
  discoverList: discoverReducer,
  seen: seenReducer,
  toasts: toastReducer
});
