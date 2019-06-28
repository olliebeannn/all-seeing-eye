import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Landing.scss';

class Landing extends Component {
  render() {
    if (this.props.auth) {
      return <Redirect to="/watchlist" />;
    }

    return (
      <div className="Landing flex flex--dir-c flex--jc--c flex--ai--c center white">
        <p className="Landing__Header">
          Never agonize over what movie to watch again.
        </p>
        <h2 className="Landing__Subhead mt2">
          Find movies and save them for later so they’re waiting for you when
          you have time.
        </h2>
        <button href="/auth/google" className="Landing__Button mt4">
          Sign Up
        </button>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
