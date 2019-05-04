import React from 'react';

import Toast from '../Toast/Toast';

const Toasts = props => {
	let toastsContent = null;

	if (props.toasts.length > 0) {
		toastsContent = (
			<ul>{props.toasts.map(toast => <Toast text={toast.text} />)}</ul>
		);
	}

	return <div className="Toasts">{toastsContent}</div>;
};

export default Toasts;
