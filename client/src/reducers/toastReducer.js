import _ from 'lodash';

import { ADD_TOAST, REMOVE_TOAST } from '../actions/types';

export default function toasts(state = [], action) {
	switch (action.type) {
		case ADD_TOAST:
			console.log('addToast in reducer', action);

			const addedState = [];

			if (state.length > 0) {
				state.forEach(elem => addedState.push(_.cloneDeep(elem)));
			}

			const newToast = {
				id: action.payload.id,
				text: action.payload.text,
				actionTaken: action.payload.actionTaken
			};

			addedState.push(newToast);

			return addedState;
		case REMOVE_TOAST:
			return state;
		default:
			return state;
	}
}
