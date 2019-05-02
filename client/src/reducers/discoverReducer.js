import { FETCH_DISCOVER } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_DISCOVER:
			console.log('inside fetch_discover in discoverReducer');
			return action.payload || false;
		default:
			return state;
	}
}
