import React, { Component } from 'react';
import styles from './Button.scss';

class Button extends Component {
	render() {
		const classes = ['Button'];

		switch (this.props.type) {
			case 'primary':
				classes.push('Button--primary');
				break;
			case 'secondary':
				classes.push('Button--secondary');
				break;
		}

		return (
			<button className={classes.join(' ')}>{this.props.children}</button>
		);
	}
}

export default Button;
