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
import Spinner from '../Spinner/Spinner';

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
    this.setState(
      {
        releaseDateMin: 1900,
        releaseDateMax: 2019,
        genres: [],
        page: 1
      },
      async () =>
        this.props.updateFilters(
          this.state.releaseDateMin,
          this.state.releaseDateMax,
          this.state.genres
        )
    );
  };

  render() {
    let moviesToDisplay = null;

    let content = <Spinner />;

    if (this.props.discoverList) {
      moviesToDisplay = this.props.discoverList.filter(movie => !movie.onSeen);
      content = <MovieList movies={moviesToDisplay} />;
    }

    return (
      <div className="Discover">
        <div className="Filters">
          <div className="Filter Filter--YearRange">
            <p className="Filter__Label">Year Released</p>
            <Range
              className="Filter__Slider mt2"
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
          <div className="Filter mt3">
            <p className="Filter__Label">Genres</p>
            <Select
              className="Filter--Select mt1"
              options={genres}
              isMulti
              onChange={this.handleGenreChange}
              value={this.state.genres}
            />
          </div>
          <div className="mt3 flex">
            <Button
              className="Button Button--primary flex-g-1 mr1"
              click={this.handleUpdateFilters}
            >
              Update Filters
            </Button>
            <Button
              className="Button Button--secondary flex-g-1 ml1"
              click={this.handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        {content}
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
