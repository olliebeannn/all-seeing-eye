import _ from 'lodash';

import { FETCH_SEEN } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SEEN:
      return action.payload || false;
    default:
      return state;
  }
}
