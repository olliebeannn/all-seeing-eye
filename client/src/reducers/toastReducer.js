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

			let newToastText = '';

			if (action.payload.actionTaken === 'add') {
				newToastText = `Added \"${action.payload.text}\" to Watchlist`;
			} else if (action.payload.actionTaken === 'remove') {
				newToastText = `Removed \"${
					action.payload.text
				}\" from Watchlist`;
			} else {
				newToastText = 'Unsupported toast action...';
			}

			const newToast = {
				id: action.payload.id,
				text: newToastText
			};

			addedState.push(newToast);

			return addedState;
		case REMOVE_TOAST:
			console.log('removeToast in reducer', action);

			let removedState = [];

			if (state.length > 0) {
				state.forEach(elem => {
					if (elem.id !== action.payload.id)
						removedState.push(_.cloneDeep(elem));
				});
			}

			return removedState;
		default:
			return state;
	}
}
