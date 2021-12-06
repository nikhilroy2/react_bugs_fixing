import { LOCATION_CHANGE } from 'connected-react-router';
import * as actionTypes from '../../types/redirect';

const initialState = {
  notFound: false,
  errorData: {},
};

const redirect = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOT_FOUND: {
      return {
        notFound: true,
        errorData: action.error.error,
      };
    }
    case LOCATION_CHANGE: {
      return {
        notFound: false,
        error: {},
      };
    }
    default:
      return state;
  }
};

export default redirect;
