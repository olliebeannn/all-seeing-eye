import React from 'react';
import './Spinner.scss';

const Spinner = props => {
  return (
    <div className="flex flex--jc--c flex--ai--c">
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
