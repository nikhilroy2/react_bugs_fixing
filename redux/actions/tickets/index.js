import * as actionTypes from '../../types/tickets';
import {
  getTicketViewUrl,
  getTicketConfig,
  addTicketUrl,
  getTicketsUrl,
  sendMessageUrl,
  unreadMessageUrl,
  closeTicketUrl,
  deleteTicketUrl,
  deleteMessageUrl,
  changeMassStatus,
  changeTicketMessage,
  massAssignAdminUrl,
  assignAdminUrl,
} from '../../../services/urls';

export const getTicketsList = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_TICKETS_LIST });

  try {
    const response = await getTicketsUrl(payload);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_TICKETS_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TICKETS_LIST_ERROR,
      error,
    });
  }
};

export const getTicketsConfigAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_TICKETS_CONFIG });

  try {
    const response = await getTicketConfig();
    const { data } = response;

    dispatch({
      type: actionTypes.GET_TICKETS_CONFIG_SUCCESS,
      data: data?.access,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TICKETS_CONFIG_ERROR,
      error,
    });
  }
};

export const addTicketAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_TICKET })

  try {
    await addTicketUrl(payload);
    dispatch({
      type: actionTypes.ADD_TICKET_SUCCESS,
    })
  } catch (error) {
    dispatch({ type: actionTypes.ADD_TICKET_ERROR, error });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
}

export const getTicketView = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_TICKET_VIEW });

  try {
    const response = await getTicketViewUrl(id);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_TICKET_VIEW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: actionTypes.GET_TICKET_VIEW_ERROR, error });
  }
}

export const sendMessage = (id, message) => async (dispatch) => {
  dispatch({ type: actionTypes.SEND_MESSAGE });
  try {
    await sendMessageUrl(id, message);
    dispatch({ type: actionTypes.SEND_MESSAGE_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.SEND_MESSAGE_ERROR, error });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
}

export const unreadTicket = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.UNREAD_MESSAGE });
  try {
    await unreadMessageUrl(id);
    dispatch({ type: actionTypes.UNREAD_MESSAGE_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.UNREAD_MESSAGE_ERROR, error });
  }
}

export const closeTicket = (id, lock) => async (dispatch) => {
  dispatch({ type: actionTypes.CLOSE_TICKET });
  try {
    await closeTicketUrl(id, lock);
    dispatch({ type: actionTypes.CLOSE_TICKET_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.CLOSE_TICKET_ERROR, error });
  }
}

export const deleteTicket = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_TICKET });
  try {
    await deleteTicketUrl(id);
    dispatch({ type: actionTypes.DELETE_TICKET_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_TICKET_ERROR, error });
  }
}

export const deleteMessage = (messageID) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_MESSAGE })

  try {
    await deleteMessageUrl(messageID);
    dispatch({
      type: actionTypes.DELETE_MESSAGE_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_MESSAGE_ERROR, error });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
}
export const changeMassStatusAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_MASS_STATUS })

  try {
    await changeMassStatus(payload);
    dispatch({
      type: actionTypes.CHANGE_MASS_STATUS_SUCCESS,
    })
  } catch (error) {
    dispatch({ type: actionTypes.CHANGE_MASS_STATUS_ERROR, error });
  }
}

export const changeTicketMessageAction = (id, message) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_TICKET_MESSAGE })

  try {
    await changeTicketMessage(id, message);
    dispatch({
      type: actionTypes.CHANGE_TICKET_MESSAGE_SUCCESS,
      payload: { id, message },
    });
  } catch (error) {
    dispatch({ type: actionTypes.CHANGE_TICKET_MESSAGE_ERROR, error });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
}

export const clearTicketView = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_TICKET_VIEW });
}

export const setActiveTicketForView = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ACTIVE_TICKET_FOR_TICKET_VIEW,
    payload: id,
  })
}

export const massAssignAdmin = (adminId, items) => async (dispatch) => {
  dispatch({ type: actionTypes.MASS_TICKETS_ASSIGN });

  try {
    await massAssignAdminUrl(adminId, items);
    dispatch({ type: actionTypes.MASS_TICKETS_ASSIGN_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.MASS_TICKETS_ASSIGN_ERROR, error });
  }
}

export const assignAdmin = (ticketId, adminId) => async (dispatch) => {
  dispatch({ type: actionTypes.ASSIGN_TICKET });

  try {
    await assignAdminUrl(ticketId, adminId);
    dispatch({ type: actionTypes.ASSIGN_TICKET_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.ASSIGN_TICKET_ERROR });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
}
