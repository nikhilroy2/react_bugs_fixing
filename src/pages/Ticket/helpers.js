import {
  sendMessage,
  unreadTicket,
  closeTicket,
  deleteTicket,
  getTicketsList,
  getTicketsConfigAction,
} from '../../redux/actions/tickets';

export const sendMessageFunc = async (dispatch, id, value, setValue) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await dispatch(sendMessage(id, value));
  } catch (error) {
    throw error;
  }
  setValue('');
};

export const markAsUnreadFunc = async (dispatch, id, setError) => {
  try {
    await dispatch(getTicketsConfigAction());
    await dispatch(unreadTicket(id));
    await dispatch(getTicketsList());
  } catch (error) {
    setError(error);
  }
};

export const deleteTicketFunc = async (dispatch, id, setError, toggle) => {
  toggle();

  try {
    await dispatch(getTicketsConfigAction());
    await dispatch(deleteTicket(id));
    await dispatch(getTicketsList());
  } catch (error) {
    setError(error);
  }
};

export const closeTicketFunc = async (dispatch, status, id, setError, toggle) => {
  toggle();

  try {
    await dispatch(getTicketsConfigAction());
    await dispatch(closeTicket(id, status));
    await dispatch(getTicketsList());
  } catch (error) {
    setError(error);
  }
};

export const moveCaret = (e) => {
  const temp_value = e.target.value;
  e.target.value = '';
  e.target.value = temp_value;
};
