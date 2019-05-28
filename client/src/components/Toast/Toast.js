import React from 'react';

import './Toast.scss';

const Toast = props => {
  return (
    <div className="Toast">
      <p className="Toast__text">{props.text}</p>
    </div>
  );
};

export default Toast;
