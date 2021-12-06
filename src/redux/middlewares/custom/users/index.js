import qs from 'qs';
import * as actionTypes from '../../../types/users';
import { getUsersListAction } from '../../../actions/users/general';

const users = (store) => (next) => (action) => {
  if (action.error) {
    switch (action.error.status) {
      case 401: {
        // do something
        break;
      }
      case 403: {
        // do something
        break;
      }
      case 404: {
        // do something
        break;
      }
      default: {
        // do something
      }
    }
  }

  const result = next(action);

  switch (action.type) {
    case actionTypes.COPY_CUSTOM_RATES_SUCCESS:
    case actionTypes.MASS_COPY_RATES_SUCCESS:
    case actionTypes.CREATE_USER_SUCCESS:
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
    case actionTypes.UPDATE_CUSTOM_RATES_SUCCESS: {
      const search = store.getState().router.location.search;
      const queryString = qs.parse(search.slice(1));
      return store.dispatch(getUsersListAction(queryString));
    }

    default: {
      // do something
    }
  }

  return result;
};

export default users;
