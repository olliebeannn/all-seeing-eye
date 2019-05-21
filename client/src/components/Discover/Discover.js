import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import styles from './Discover.scss';
// Slider component styles
import 'rc-slider/assets/index.css';

import * as actions from '../../actions';

import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';
import Button from '../Button/Button';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      releaseDateMin: 1900,
      releaseDateMax: 2019
    };
  }

  componentDidMount() {
    this.props.loadDiscoverMovies(this.state.currentPage);
  }

  loadMoreMovies = () => {
    let page = this.state.currentPage;

    this.props.loadDiscoverMovies(page + 1);

    this.setState({ currentPage: page + 1 });
  };

  handleReleaseYearChange = sliderValues => {
    console.log(sliderValues);
  };

  render() {
    let moviesToDisplay = null;

    if (this.props.discoverList) {
      moviesToDisplay = this.props.discoverList.filter(movie => !movie.onSeen);
    }

    return (
      <div className="Discover">
        <div className="Discover__filters">
          <Range
            min={1900}
            max={2019}
            defaultValue={[
              this.state.releaseDateMin,
              this.state.releaseDateMax
            ]}
            onAfterChange={this.handleReleaseYearChange}
          />
        </div>
        <MovieList movies={moviesToDisplay} />
        <div className="Discover__loadMore">
          <Button
            className="Button Button--primary"
            click={this.loadMoreMovies}
          >
            Load More...
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ discoverList }) {
  return { discoverList };
}

export default connect(
  mapStateToProps,
  actions
)(Discover);
