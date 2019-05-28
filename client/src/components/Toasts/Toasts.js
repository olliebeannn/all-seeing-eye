import React from 'react';
import { connect } from 'react-redux';

import Toast from '../Toast/Toast';
import './Toasts.scss';

const Toasts = props => {
  let toastsContent = null;

  if (props.toasts.length > 0) {
    toastsContent = (
      <ul>
        {props.toasts.map(toast => <Toast text={toast.text} key={toast.id} />)}
      </ul>
    );
  }

  return <div className="Toasts">{toastsContent}</div>;
};

function mapStateToProps({ toasts }) {
  return { toasts };
}

export default connect(mapStateToProps)(Toasts);
