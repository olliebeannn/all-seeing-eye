import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import * as actions from '../../actions';
import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';

import styles from './Watchlist.scss';

class Watchlist extends Component {
	render() {
		return (
			<div className="Watchlist">
				<MovieList movies={this.props.watchlist} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		watchlist: state.watchlist
	};
}

export default connect(
	mapStateToProps,
	actions
)(Watchlist);
