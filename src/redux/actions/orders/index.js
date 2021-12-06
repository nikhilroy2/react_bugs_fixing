import * as actionTypes from '../../types/orders';
import {
  getOrdersConfig,
  getOrdersUrl,
  changeOrderStatusUrl,
  cancelOrderUrl,
  resendOrdersUrl,
  refillOrderUrl,
  setOrderPartialUrl,
  setOrderRemainsUrl,
  getOrderDetails,
  changeOrderLink,
  bulkUpdateOrdersStatus,
  getOrderSendInfo,
  getSearchUsersList,
} from '../../../services/urls';

/**
 * @function
 * @name clearOrdersStateAction
 * @description - Clear state
 */
export const clearOrdersStateAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ORDERS_STATE });
};

/**
 * @function
 * @name getOrdersListAction
 * @param {object} payload - order list with query
 */
export const getOrdersListAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ORDERS_LIST });

  try {
    const response = await getOrdersUrl(payload);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_ORDERS_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ORDERS_LIST_ERROR });
  }
};

/**
 * @function
 * @name getOrdersConfigActions
 */
export const getOrdersConfigActions = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ORDERS_CONFIG });

  try {
    const response = await getOrdersConfig();
    const { data } = response;

    dispatch({
      type: actionTypes.GET_ORDERS_CONFIG_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ORDERS_CONFIG_ERROR });
  }
};

/**
 * @function
 * @name changeOrderStatusAction
 * @param {number} id - id order
 * @param {number} status - status order
 */
export const changeOrderStatusAction = (id, status) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_ORDER_STATUS });

  try {
    await changeOrderStatusUrl(id, status);

    dispatch({
      type: actionTypes.CHANGE_ORDER_STATUS_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CHANGE_ORDER_STATUS_ERROR, error });
  }
};

/**
 * @function
 * @name cancelOrderAction
 * @param {number} id - id order
 */
export const cancelOrderAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.CANCEL_ORDER });

  try {
    await cancelOrderUrl(id);

    dispatch({
      type: actionTypes.CANCEL_ORDER_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CANCEL_ORDER_ERROR, error });
  }
};

/**
 * @function
 * @name resendOrderAction
 * @param {number} id - id order
 */
export const resendOrderAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.RESEND_ORDER });

  try {
    await resendOrdersUrl(id);

    dispatch({
      type: actionTypes.RESEND_ORDER_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.RESEND_ORDER_ERROR, error });
  }
};

/**
 * @function
 * @name refillOrderAction
 * @param {number} id - id order
 */
export const refillOrderAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.REFILL_ORDER });

  try {
    await refillOrderUrl(id);

    dispatch({
      type: actionTypes.REFILL_ORDER_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.REFILL_ORDER_ERROR, error });
  }
};

/**
 * @function
 * @name setOrderPartialAction
 * @param {number} id - id order
 * @param {number} remains - remains value
 */
export const setOrderPartialAction = (id, remains) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_ORDER_PARTIAL });

  try {
    await setOrderPartialUrl(id, remains);

    dispatch({
      type: actionTypes.SET_ORDER_PARTIAL_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.SET_ORDER_PARTIAL_ERROR, error });
  }
};

/**
 * @function
 * @name setOrderRemainsAction
 * @param {number} id - id order
 * @param {number} remains - remains value
 */
export const setOrderRemainsAction = (id, remains) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_ORDER_REMAINS });

  try {
    await setOrderRemainsUrl(id, remains);

    dispatch({
      type: actionTypes.SET_ORDER_REMAINS_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.SET_ORDER_REMAINS_ERROR, error });
  }
};

/**
 * @function
 * @name getOrdersDetailsAction
 * @param {number} id - id order
 * @param {number} type - type order
 * @param {number} num - num order(?)
 */
export const getOrdersDetailsAction = (id, type, num) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ORDER_DETAILS });

  try {
    const response = await getOrderDetails(id, type, num);
    const data = response.data.fields;

    dispatch({
      type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ORDER_DETAILS_ERROR, error });
  }
};

/**
 * @function
 * @name changeOrderLinkAction
 * @param {number} id - id order
 * @param {string} link - link value
 */
export const changeOrderLinkAction = (id, link) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_ORDER_LINK });

  try {
    await changeOrderLink(id, link);

    dispatch({
      type: actionTypes.CHANGE_ORDER_LINK_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CHANGE_ORDER_LINK_ERROR, error });
  }
};

/**
 * @function
 * @name getOrderSendInfoAction
 * @param {number} id - id order
 */
export const getOrderSendInfoAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ORDER_SEND_INFO });

  try {
    const response = await getOrderSendInfo(id);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_ORDER_SEND_INFO_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ORDER_SEND_INFO_ERROR, error });
  }
};

/**
 * @function
 * @name bulkUpdateOrdersStatus
 * @param {object} payload - data with array id and status id
 */
export const bulkUpdateOrdersStatusAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.BULK_ORDERS_STATUS });

  try {
    await bulkUpdateOrdersStatus(payload);

    dispatch({
      type: actionTypes.BULK_ORDERS_STATUS_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.BULK_ORDERS_STATUS_ERROR, error });
  }
};

/**
 * @function
 * @name getUsersList
 * @param {string} str - search string for request
 */
export const getUsersList = (str) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_USERS_LIST_SEARCH });

  try {
    const response = await getSearchUsersList(str);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_USERS_LIST_SEARCH_SUCCESS,
      data,
    });

    return data;
  } catch (error) {
    dispatch({ type: actionTypes.GET_USERS_LIST_SEARCH_ERROR, error });
  }
};
