import React, { Component } from 'react';

import '../styles/reset.css';
import './App.scss';
import Header from './Header/Header';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
			</div>
		);
	}
}

export default App;
