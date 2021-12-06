import qs from 'qs';
import * as actionTypes from '../../../types/orders';
import { getOrdersListAction } from '../../../actions/orders';

const orders = (store) => (next) => (action) => {
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
    case actionTypes.CHANGE_ORDER_STATUS_SUCCESS:
    case actionTypes.CHANGE_ORDER_LINK_SUCCESS:
    case actionTypes.CANCEL_ORDER_SUCCESS:
    case actionTypes.RESEND_ORDER_SUCCESS:
    case actionTypes.REFILL_ORDER_SUCCESS:
    case actionTypes.SET_ORDER_PARTIAL_SUCCESS:
    case actionTypes.SET_ORDER_REMAINS_SUCCESS:
    case actionTypes.BULK_ORDERS_STATUS_SUCCESS: {
      const search = store.getState().router.location.search;
      const queryString = qs.parse(search.slice(1));
      return store.dispatch(getOrdersListAction(queryString));
    }

    default: {
      // do something
    }
  }

  return result;
};

export default orders;
