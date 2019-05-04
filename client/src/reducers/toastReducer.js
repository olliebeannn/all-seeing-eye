import { ADD_TOAST, REMOVE_TOAST } from '../actions/types';

export default function toasts(state = [], action) {
	console.log('Toast reducer called', action);

	switch (action.type) {
		case ADD_TOAST:
			return state;
		case REMOVE_TOAST:
			return state;
		default:
			return state;
	}
}
