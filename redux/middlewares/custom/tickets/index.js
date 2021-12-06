import qs from 'qs';

import * as actionTypes from '../../../types/tickets';
import { getTicketsList, getTicketView } from '../../../actions/tickets';
import { history } from '../../../../history';

const tickets = (store) => (next) => (action) => {
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
    case actionTypes.MASS_TICKETS_ASSIGN_SUCCESS:
    case actionTypes.CHANGE_MASS_STATUS_SUCCESS:
    case actionTypes.ADD_TICKET_SUCCESS:
      const queryString = qs.parse(history.location.search.slice(1));
      store.dispatch(getTicketsList(queryString));
      break;

    case actionTypes.SEND_MESSAGE_SUCCESS:
    case actionTypes.DELETE_MESSAGE_SUCCESS:
    case actionTypes.CHANGE_TICKET_MESSAGE_SUCCESS: {
      const id = store.getState().tickets.activeViewId;
      store.dispatch(getTicketView(id));
      break;
    }

    case actionTypes.UNREAD_MESSAGE:
    case actionTypes.CLOSE_TICKET:
    case actionTypes.DELETE_TICKET: {
      history.push('/admin/tickets');
      break;
    }

    default: {
      // do something
    }
  }

  return result;
};

export default tickets;
