import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './EmptyList.scss';

import Button from '../Button/Button';

class EmptyList extends Component {
  render() {
    return (
      <div className="EmptyList flex flex--ai--c flex--dir-c">
        <img className="EmptyList__image" src={this.props.image} />
        <h2 className="EmptyList__text white center mt2">{this.props.text}</h2>
        <Button
          click={() => {
            this.props.history.push('/discover');
          }}
          className="Button Button--primary mt2"
        >
          {this.props.buttonText}
        </Button>
      </div>
    );
  }
}

export default withRouter(EmptyList);
