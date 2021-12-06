import * as actionTypes from '../../types/refill';

const initialState = {
  isFetching: false,
  actionFetching: false,
  error: false,
  data: [],
  config: {},
  modes: [],
  services: [],
  taks: {},
  details: [],
};

const refill = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_REFILL_STATE: {
      return {
        ...state,
        modes: [],
        services: [],
        task: {},
        details: [],
      };
    }

    // List & Config
    case actionTypes.GET_REFILL_LIST: {
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    }

    case actionTypes.GET_REFILL_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }

    case actionTypes.GET_REFILL_CONFIG_SUCCESS: {
      return {
        ...state,
        config: action.data,
      };
    }

    case actionTypes.GET_REFILL_CONFIG_ERROR:
    case actionTypes.GET_REFILL_LIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    }

    // Modes & Services
    case actionTypes.GET_REFILL_SERVICES:
    case actionTypes.GET_REFILL_MODES: {
      return {
        ...state,
      };
    }

    case actionTypes.GET_REFILL_MODES_SUCCESS: {
      return {
        ...state,
        modes: action.data,
      };
    }

    case actionTypes.GET_REFILL_SERVICES_SUCCESS: {
      return {
        ...state,
        services: action.data,
      };
    }

    case actionTypes.GET_REFILL_SERVICES_ERROR:
    case actionTypes.GET_REFILL_MODES_ERROR: {
      return {
        ...state,
      };
    }

    // View
    case actionTypes.VIEW_REFILL_TASK: {
      return {
        ...state,
        actionFetching: true,
      };
    }

    case actionTypes.VIEW_REFILL_TASK_SUCCESS: {
      return {
        ...state,
        task: action.data,
        actionFetching: false,
      };
    }

    case actionTypes.VIEW_REFILL_TASK_ERROR: {
      return {
        ...state,
        actionFetching: false,
      };
    }

    // Super details
    case actionTypes.DETAILS_SUPER_REFILL: {
      return {
        ...state,
        actionFetching: true,
      };
    }

    case actionTypes.DETAILS_SUPER_REFILL_SUCCESS: {
      return {
        ...state,
        actionFetching: false,
        details: action.data,
      };
    }

    case actionTypes.DETAILS_SUPER_REFILL_ERROR: {
      return {
        ...state,
        actionFetching: false,
      };
    }

    // BULK ACTIONS
    case actionTypes.BULK_UPDATE_STATUS_REFILL:
    case actionTypes.BULK_RESEND_REFILL_TASKS:
    case actionTypes.BULK_CANCEL_REFILL_TASKS: {
      return {
        ...state,
        actionFetching: true,
      };
    }

    case actionTypes.BULK_UPDATE_STATUS_REFILL_SUCCESS:
    case actionTypes.BULK_RESEND_REFILL_TASKS_SUCCESS:
    case actionTypes.BULK_CANCEL_REFILL_TASKS_SUCCESS: {
      return {
        ...state,
        actionFetching: false,
      };
    }

    case actionTypes.BULK_UPDATE_STATUS_REFILL_ERROR:
    case actionTypes.BULK_RESEND_REFILL_TASKS_ERROR:
    case actionTypes.BULK_CANCEL_REFILL_TASKS_ERROR: {
      return {
        ...state,
        actionFetching: false,
      };
    }

    default: {
      break;
    }
  }

  return state;
};

export default refill;
