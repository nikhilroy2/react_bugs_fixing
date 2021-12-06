import qs from 'qs';
import * as actionTypes from '../../../types/refill';
import { getRefillListAction } from '../../../actions/refill';

const refill = (store) => (next) => (action) => {
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
    case actionTypes.BULK_UPDATE_STATUS_REFILL_SUCCESS:
    case actionTypes.BULK_RESEND_REFILL_TASKS_SUCCESS:
    case actionTypes.BULK_CANCEL_REFILL_TASKS_SUCCESS:
    case actionTypes.CHANGE_REFILL_TASK_STATUS_SUCCESS:
    case actionTypes.RESEND_REFILL_TASK_SUCCESS:
    case actionTypes.CANCEL_REFILL_TASK_SUCCESS: {
      const search = store.getState().router.location.search;
      const queryString = qs.parse(search.slice(1));
      return store.dispatch(getRefillListAction(queryString));
    }

    default: {
      // do something
    }
  }

  return result;
};

export default refill;
