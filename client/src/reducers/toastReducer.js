import { SHOW_TOAST, HIDE_TOAST } from '../actions/types';

export default function toasts(state = { visible: false, text: '' }, action) {
	switch (action.type) {
		case SHOW_TOAST:
			let shownState = {
				visible: true,
				text: action.payload.text
			};
			return shownState;
		case HIDE_TOAST:
			let hiddenState = {
				visible: false,
				text: ''
			};
			return hiddenState;
		default:
			return state;
	}
}
