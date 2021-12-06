import * as actionTypes from '../../types/tickets';

const initState = {
  error: false,
  isFetching: false,
  deleteFetching: false,
  replyFetching: false,
  addFetching: false,
  massFetching: false,
  neededListRequest: true,
  data: {
    staff: [],
  },
  config: {},
  view: {},
  activeViewId: -1,
};

const tickets = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_TICKET:
    case actionTypes.CLOSE_TICKET:
    case actionTypes.UNREAD_MESSAGE: {
      return {
        ...state,
        neededListRequest: false,
        isFetching: true,
        deleteFetching: true,
      };
    }

    case actionTypes.UNREAD_MESSAGE_ERROR:
    case actionTypes.DELETE_TICKET_ERROR:
    case actionTypes.CLOSE_TICKET_ERROR: {
      return {
        ...state,
        error: action.error_message,
        deleteFetching: false,
        neededListRequest: true,
      };
    }

    case actionTypes.CLOSE_TICKET_SUCCESS:
    case actionTypes.DELETE_TICKET_SUCCESS:
    case actionTypes.UNREAD_MESSAGE_SUCCESS: {
      return {
        ...state,
        neededListRequest: true,
        deleteFetching: false,
      };
    }

    case actionTypes.GET_TICKET_VIEW:
    case actionTypes.GET_TICKETS_LIST:
    case actionTypes.GET_TICKETS_CONFIG: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.ASSIGN_TICKET:
    case actionTypes.ADD_TICKET: {
      return {
        ...state,
        addFetching: true,
      };
    }
    case actionTypes.SEND_MESSAGE: {
      return {
        ...state,
        replyFetching: true,
      };
    }
    case actionTypes.CHANGE_TICKET_MESSAGE: {
      return {
        ...state,
        deleteFetching: true,
      };
    }

    case actionTypes.MASS_TICKETS_ASSIGN:
    case actionTypes.CHANGE_MASS_STATUS: {
      return {
        ...state,
        massFetching: true,
      }
    }

    case actionTypes.MASS_TICKETS_ASSIGN_SUCCESS:
    case actionTypes.CHANGE_MASS_STATUS_SUCCESS: {
      return {
        ...state,
        massFetching: false,
      }
    }

    case actionTypes.MASS_TICKETS_ASSIGN_ERROR:
    case actionTypes.CHANGE_MASS_STATUS_ERROR: {
      return {
        ...state,
        massFetching: false,
      }
    }

    case actionTypes.CHANGE_TICKET_MESSAGE_SUCCESS:
    case actionTypes.CHANGE_TICKET_MESSAGE_ERROR: {
      return {
        ...state,
        error: action.error_message,
        deleteFetching: false,
      };
    }
    case actionTypes.GET_TICKETS_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case actionTypes.GET_TICKETS_CONFIG_SUCCESS: {
      return {
        ...state,
        config: action.data,
      };
    }
    case actionTypes.SEND_MESSAGE_ERROR: {
      return {
        ...state,
        error: action.error_message,
        replyFetching: false,
      };
    }
    case actionTypes.SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        error: action.error_message,
        replyFetching: false,
      };
    }
    case actionTypes.ASSIGN_TICKET_SUCCESS:
    case actionTypes.ASSIGN_TICKET_ERROR:
    case actionTypes.ADD_TICKET_ERROR:
    case actionTypes.ADD_TICKET_SUCCESS: {
      return {
        ...state,
        addFetching: false,
      };
    }
    case actionTypes.GET_TICKET_VIEW_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        view: action.payload,
      };
    }
    case actionTypes.GET_TICKET_VIEW_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error_message,
      };
    }
    case actionTypes.GET_TICKETS_LIST_ERROR:
    case actionTypes.GET_TICKETS_CONFIG_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error_message,
      };
    }
    case actionTypes.CLEAR_TICKET_VIEW: {
      return {
        ...state,
        view: {},
      };
    }
    case actionTypes.SET_ACTIVE_TICKET_FOR_TICKET_VIEW: {
      return {
        ...state,
        activeViewId: action.payload,
      };
    }
    default: {
      break;
    }
  }

  return state;
};

export default tickets;
