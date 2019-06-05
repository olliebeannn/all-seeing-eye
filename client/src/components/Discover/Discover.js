import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

import './Discover.scss';
// Slider component styles
import 'rc-slider/assets/index.css';

import * as actions from '../../actions';
import genres from '../../utils/genres';

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
      startYear: 1900,
      endYear: 2019,
      genres: []
    };
  }

  componentDidMount() {
    let search = queryString.parse(this.props.location.search);

    let page = search.page ? parseInt(search.page) : 1;
    let startYear = search.startYear ? parseInt(search.startYear) : 1900;
    let endYear = search.endYear ? parseInt(search.endYear) : 2019;

    let genreIds = search.genres ? search.genres.split(',') : [];

    // Load movies based on filters in query params, or use defaults
    this.props.loadDiscoverMovies(page, startYear, endYear, genreIds);

    // Grab the genre objects to push onto state from the IDs in params
    let currentGenres = genres.filter(elem => {
      return genreIds.includes(elem.value.toString());
    });

    // Set the state to query params if available so filter state matches
    this.setState({
      currentPage: page,
      startYear: startYear,
      endYear: endYear,
      genres: currentGenres
    });
  }

  loadMoreMovies = () => {
    let page = this.state.currentPage;

    this.props.loadDiscoverPage(
      page + 1,
      this.state.startYear,
      this.state.endYear,
      this.state.genres.map(elem => elem.value)
    );

    let searchParams = new URLSearchParams({
      startYear: this.state.startYear,
      endYear: this.state.endYear,
      page: page + 1
    });

    if (this.state.genres.length) {
      let genreString = this.state.genres.map(elem => elem.value).join(',');
      searchParams.append('genres', genreString);
    }

    this.props.history.push({
      pathname: '/discover',
      search: searchParams.toString()
    });

    this.setState({ currentPage: page + 1 });
  };

  handleReleaseYearChange = sliderValues => {
    this.setState({
      startYear: sliderValues[0],
      endYear: sliderValues[1]
    });
  };

  handleGenreChange = selectedOptions => {
    this.setState({ genres: selectedOptions });
  };

  handleUpdateFilters = () => {
    let searchParams = new URLSearchParams({
      startYear: this.state.startYear,
      endYear: this.state.endYear,
      page: 1
    });

    if (this.state.genres.length) {
      let genreString = this.state.genres.map(elem => elem.value).join(',');
      searchParams.append('genres', genreString);
    }

    this.props.history.push({
      pathname: '/discover',
      search: searchParams.toString()
    });

    this.setState(
      {
        ..._.cloneDeep(this.state),
        currentPage: 1
      },
      async () => {
        this.props.loadDiscoverMovies(
          1,
          this.state.startYear,
          this.state.endYear,
          this.state.genres.map(elem => elem.value)
        );
      }
    );
  };

  handleClearFilters = () => {
    this.props.history.push({
      pathname: '/discover',
      search: ''
    });

    this.setState(
      {
        startYear: 1900,
        endYear: 2019,
        genres: [],
        currentPage: 1
      },
      async () =>
        this.props.loadDiscoverMovies(
          this.state.currentPage,
          this.state.startYear,
          this.state.endYear,
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
              defaultValue={[this.state.startYear, this.state.endYear]}
              value={[this.state.startYear, this.state.endYear]}
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

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Discover)
);
