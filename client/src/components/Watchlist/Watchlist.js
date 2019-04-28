import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Watchlist extends Component {
	// Process for displaying movies:
	// After mount, get the updated user (use existing action creator?) to extract their watchlist
	// Make series of calls to fetch basic movie details for watchlist movies (and put on local state?)
	// Display those via movie components

	componentDidMount() {
		this.props.fetchUser();
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
