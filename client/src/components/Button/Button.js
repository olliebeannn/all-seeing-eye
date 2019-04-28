import React, { Component } from 'react';
import styles from './Button.scss';

const Button = props => {
	return (
		<button className={props.className} onClick={props.click}>
			{props.children}
		</button>
	);
};

export default Button;
