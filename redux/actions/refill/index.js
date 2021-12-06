import * as actionTypes from '../../types/refill';
import {
  getRefillListUrl,
  getRefillConfigUrl,
  getRefillModesUrl,
  getRefillServicesUrl,
  viewRefillTaskUrl,
  superDetailsRefillUrl,
  resendRefillTaskUrl,
  cancelRefillTaskUrl,
  changeRefillStatusUrl,
  bulkUpdateRefillStatusUrl,
  bulkResendRefillUrl,
  bulkCancelRefillUrl,
} from '../../../services/urls';

/**
 * @function
 * @name clearRefillState
 * @description Очистка стейта
 */
export const clearRefillState = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_REFILL_STATE });
};

/**
 * @function
 * @name getRefillListAction
 * @description Листинг страницы
 * @param {object} payload - Объект query листинга(фильтров)
 */
export const getRefillListAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_REFILL_LIST });

  try {
    const response = await getRefillListUrl(payload);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_REFILL_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_REFILL_LIST_ERROR });
  }
};

/**
 * @function
 * @name getRefillConfigAction
 * @description Конфигураци страницы
 */
export const getRefillConfigAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_REFILL_CONFIG });

  try {
    const response = await getRefillConfigUrl();
    const { data } = response;

    dispatch({
      type: actionTypes.GET_REFILL_CONFIG_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_REFILL_CONFIG_ERROR });
  }
};

/**
 * @function
 * @name getRefillModesAction
 * @description Список доступных модов
 * @param {object} payload - Объект query листинга(фильтров)
 */
export const getRefillModesAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_REFILL_MODES });

  try {
    const response = await getRefillModesUrl(payload);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_REFILL_MODES_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_REFILL_MODES_ERROR });
  }
};

/**
 * @function
 * @name getRefillServicesAction
 * @description Список доступных сервисов
 * @param {object} payload - Объект query листинга(фильтров)
 */
export const getRefillServicesAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_REFILL_SERVICES });

  try {
    const response = await getRefillServicesUrl(payload);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_REFILL_SERVICES_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_REFILL_SERVICES_ERROR });
  }
};

/**
 * @function
 * @name viewRefillTaskAction
 * @description Просмотр task
 * @param {number} id - id task
 */
export const viewRefillTaskAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.VIEW_REFILL_TASK });

  try {
    const response = await viewRefillTaskUrl(id);
    const { data } = response;

    dispatch({
      type: actionTypes.VIEW_REFILL_TASK_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.VIEW_REFILL_TASK_ERROR });
  }
};

/**
 * @function
 * @name superDetailsRefillAction
 * @description Просмотр деталей task, только для суперадмина
 * @param {number} id - id task
 */
export const superDetailsRefillAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.DETAILS_SUPER_REFILL });

  try {
    const response = await superDetailsRefillUrl(id);
    const { data } = response;

    dispatch({
      type: actionTypes.DETAILS_SUPER_REFILL_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.DETAILS_SUPER_REFILL_ERROR });
  }
};

/**
 * @function
 * @name resendRefillTaskAction
 * @description Повторная отправка task
 * @param {number} id - id task
 */
export const resendRefillTaskAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.RESEND_REFILL_TASK });

  try {
    await resendRefillTaskUrl(id);

    dispatch({
      type: actionTypes.RESEND_REFILL_TASK_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.RESEND_REFILL_TASK_ERROR });
  }
};

/**
 * @function
 * @name cancelRefillTaskAction
 * @description Отмена task
 * @param {number} id - id task
 */
export const cancelRefillTaskAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.CANCEL_REFILL_TASK });

  try {
    await cancelRefillTaskUrl(id);

    dispatch({
      type: actionTypes.CANCEL_REFILL_TASK_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CANCEL_REFILL_TASK_ERROR });
  }
};

/**
 * @function
 * @name changeRefillStatusAction
 * @description Смена статуса task
 * @param {number} id - id task
 * @param {number} status - номер статуса
 */
export const changeRefillStatusAction = (id, status) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_REFILL_TASK_STATUS });

  try {
    await changeRefillStatusUrl(id, status);

    dispatch({
      type: actionTypes.CHANGE_REFILL_TASK_STATUS_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CHANGE_REFILL_TASK_STATUS_ERROR });
  }
};

/**
 * @function
 * @name bulkUpdateRefillStatusAction
 * @description Смена статуса нескольких tasks
 * @param {object} payload - содержит в себе tasks<Array>: id(список tasks) и status<number>: number(номер статуса)
 * @param {Function} setValues - функция очистки выбранных значений в tasks
 */
export const bulkUpdateRefillStatusAction = (payload, setValues) => async (dispatch) => {
  dispatch({ type: actionTypes.BULK_UPDATE_STATUS_REFILL });

  try {
    await bulkUpdateRefillStatusUrl(payload);

    dispatch({
      type: actionTypes.BULK_UPDATE_STATUS_REFILL_SUCCESS,
    });
    setValues([]);
  } catch (error) {
    dispatch({ type: actionTypes.BULK_UPDATE_STATUS_REFILL_ERROR });
  }
};

/**
 * @function
 * @name bulkResendRefillAction
 * @description Повторная отправка нескольких tasks
 * @param {Object} tasks - объект с массивом id tasks
 * @param {Function} setValues - функция очистки выбранных значений в tasks
 */
export const bulkResendRefillAction = (tasks, setValues) => async (dispatch) => {
  dispatch({ type: actionTypes.BULK_RESEND_REFILL_TASKS });

  try {
    await bulkResendRefillUrl(tasks);

    dispatch({
      type: actionTypes.BULK_RESEND_REFILL_TASKS_SUCCESS,
    });
    setValues([]);
  } catch (error) {
    dispatch({ type: actionTypes.BULK_RESEND_REFILL_TASKS_ERROR });
  }
};

/**
 * @function
 * @name bulkCancelRefillAction
 * @description Отмена нескольких tasks
 * @param {Object} tasks - объект с массивом id tasks
 * @param {Function} setValues - функция очистки выбранных значений в tasks
 */
export const bulkCancelRefillAction = (tasks, setValues) => async (dispatch) => {
  dispatch({ type: actionTypes.BULK_CANCEL_REFILL_TASKS });

  try {
    await bulkCancelRefillUrl(tasks);

    dispatch({
      type: actionTypes.BULK_CANCEL_REFILL_TASKS_SUCCESS,
    });
    setValues([]);
  } catch (error) {
    dispatch({ type: actionTypes.BULK_CANCEL_REFILL_TASKS_ERROR });
  }
};
