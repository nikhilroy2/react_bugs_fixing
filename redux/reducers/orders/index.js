import * as actionTypes from '../../types/orders';

const initialState = {
  isFetching: false,
  actionFetching: false,
  error: false,
  data: [],
  config: {},
  orderDetails: [],
  users: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_ORDERS_STATE: {
      return {
        ...state,
        orderDetails: [],
      };
    }

    case actionTypes.GET_ORDERS_LIST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case actionTypes.GET_ORDERS_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }

    case actionTypes.GET_ORDERS_CONFIG_SUCCESS: {
      return {
        ...state,
        config: action.data,
      };
    }

    // fake users search
    case actionTypes.GET_USERS_LIST_SEARCH: {
      return {
        ...state,
        users: [],
      };
    }

    case actionTypes.GET_USERS_LIST_SEARCH_SUCCESS: {
      return {
        ...state,
        users: action.data,
      };
    }

    case actionTypes.GET_ORDERS_CONFIG_ERROR:
    case actionTypes.GET_ORDERS_LIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    }

    case actionTypes.GET_ORDER_DETAILS:
    case actionTypes.GET_ORDER_SEND_INFO: {
      return {
        ...state,
        actionFetching: true,
      };
    }

    case actionTypes.GET_ORDER_DETAILS_SUCCESS:
    case actionTypes.GET_ORDER_SEND_INFO_SUCCESS: {
      return {
        ...state,
        orderDetails: action.data,
        actionFetching: false,
      };
    }

    case actionTypes.CHANGE_ORDER_STATUS:
    case actionTypes.CHANGE_ORDER_LINK:
    case actionTypes.CANCEL_ORDER:
    case actionTypes.RESEND_ORDER:
    case actionTypes.REFILL_ORDER:
    case actionTypes.SET_ORDER_PARTIAL:
    case actionTypes.SET_ORDER_REMAINS:
    case actionTypes.BULK_ORDERS_STATUS: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case actionTypes.CHANGE_ORDER_STATUS_SUCCESS:
    case actionTypes.CHANGE_ORDER_LINK_SUCCESS:
    case actionTypes.CANCEL_ORDER_SUCCESS:
    case actionTypes.RESEND_ORDER_SUCCESS:
    case actionTypes.REFILL_ORDER_SUCCESS:
    case actionTypes.SET_ORDER_PARTIAL_SUCCESS:
    case actionTypes.SET_ORDER_REMAINS_SUCCESS:
    case actionTypes.BULK_ORDERS_STATUS_SUCCESS: {
      return {
        ...state,
      };
    }

    case actionTypes.CHANGE_ORDER_STATUS_ERROR:
    case actionTypes.CHANGE_ORDER_LINK_ERROR:
    case actionTypes.CANCEL_ORDER_ERROR:
    case actionTypes.RESEND_ORDER_ERROR:
    case actionTypes.REFILL_ORDER_ERROR:
    case actionTypes.SET_ORDER_PARTIAL_ERROR:
    case actionTypes.SET_ORDER_REMAINS_ERROR:
    case actionTypes.GET_ORDER_DETAILS_ERROR:
    case actionTypes.GET_ORDER_SEND_INFO_ERROR:
    case actionTypes.BULK_ORDERS_STATUS_ERROR: {
      return {
        ...state,
        error: true,
        actionFetching: false,
      };
    }

    default: {
      break;
    }
  }

  return state;
};

export default orders;
