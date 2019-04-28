import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../actions';
import Movie from '../Movie/Movie';

class Watchlist extends Component {
	// Process for displaying movies:
	// After mount, get the updated user (use existing action creator?) to extract their watchlist
	// Call backend API to get movie details for watchlist movies (and put on local state?)
	// Display those via movie components

	componentDidMount() {
		// this.props.fetchUser();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.auth !== this.props.auth) {
			console.log('componentDidUpdate!');
			console.log('props', this.props);

			axios
				.post('/api/watchlist/fetch', {
					movieIds: this.props.auth.watchlist
				})
				.then(res => console.log(res));
		}
	}

	render() {
		return <div>Watchlist</div>;
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(
	mapStateToProps,
	actions
)(Watchlist);
