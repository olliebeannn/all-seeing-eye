import React, { Component } from 'react';
import axios from 'axios';

class Discover extends Component {
	componentDidMount() {
		axios.get('/api/fetch').then(res => {
			console.log(res.data);
		});
	}

	render() {
		return <div>Discover</div>;
	}
}

export default Discover;
