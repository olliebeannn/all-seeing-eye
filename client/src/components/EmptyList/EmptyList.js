import React from 'react';

import './EmptyList.scss';

import Button from '../Button/Button';

const EmptyList = props => {
  return (
    <div className="EmptyList flex flex--ai--c flex--dir-c">
      <img className="EmptyList__image" src={props.image} />
      <h2 className="EmptyList__text white center mt2">{props.text}</h2>
      <Button className="Button Button--primary mt2">{props.buttonText}</Button>
    </div>
  );
};

export default EmptyList;
