import React from 'react';
import './Landing.scss';

const Landing = props => {
  return (
    <div className="Landing flex flex--dir-c flex--jc--c flex--ai--c center white">
      <p className="Landing__Header">
        Never agonize over what movie to watch again.
      </p>
      <h2 className="Landing__Subhead mt2">
        Find movies and save them for later so they’re waiting for you when you
        have time.
      </h2>
      <button href="/auth/google" className="Landing__Button mt4">
        Sign Up
      </button>
    </div>
  );
};

export default Landing;
