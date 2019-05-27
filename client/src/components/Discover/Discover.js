import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import Select from 'react-select';

import styles from './Discover.scss';
// Slider component styles
import 'rc-slider/assets/index.css';

import * as actions from '../../actions';
import genres from '../../utils/genres';

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
      releaseDateMax: 2019,
      genres: []
    };
  }

  componentDidMount() {
    this.props.loadDiscoverMovies(this.state.currentPage);
  }

  loadMoreMovies = () => {
    let page = this.state.currentPage;

    this.props.loadDiscoverMovies(
      page + 1,
      this.state.releaseDateMin,
      this.state.releaseDateMax,
      this.state.genres
    );

    this.setState({ currentPage: page + 1 });
  };

  handleReleaseYearChange = sliderValues => {
    this.setState({
      releaseDateMin: sliderValues[0],
      releaseDateMax: sliderValues[1]
    });
  };

  handleGenreChange = selectedOptions => {
    this.setState({ genres: selectedOptions });
  };

  handleUpdateFilters = () => {
    console.log('this.state.releaseDateMin', this.state.releaseDateMin);
    console.log('this.state.releaseDateMax', this.state.releaseDateMax);
    console.log('this.state.genres', this.state.genres);

    this.props.updateFilters(
      this.state.releaseDateMin,
      this.state.releaseDateMax,
      this.state.genres
    );
  };

  handleClearFilters = () => {
    this.setState({
      releaseDateMin: 1900,
      releaseDateMax: 2019,
      genres: [],
      page: 1
    });

    this.props.updateFilters(
      this.state.releaseDateMin,
      this.state.releaseDateMax,
      this.state.genres
    );
  };

  render() {
    let moviesToDisplay = null;

    if (this.props.discoverList) {
      moviesToDisplay = this.props.discoverList.filter(movie => !movie.onSeen);
    }

    return (
      <div className="Discover">
        <div className="Discover__filters">
          <div className="Discover__filter">
            <Range
              min={1900}
              max={2019}
              defaultValue={[
                this.state.releaseDateMin,
                this.state.releaseDateMax
              ]}
              value={[this.state.releaseDateMin, this.state.releaseDateMax]}
              onChange={this.handleReleaseYearChange}
            />
          </div>
          <div className="mt1">
            <Select
              options={genres}
              isMulti
              onChange={this.handleGenreChange}
              value={this.state.genres}
            />
          </div>
          <div>
            <Button
              className="Button Button--primary"
              click={this.handleUpdateFilters}
            >
              Update Filters
            </Button>
            <Button
              className="Button Button--secondary"
              click={this.handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
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
