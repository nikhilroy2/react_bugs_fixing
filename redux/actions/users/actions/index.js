import * as actionTypes from '../../../types/users';
import {
  getUserData,
  createUser,
  updateUserData,
  setUserPasswordUrl,
  changeUserStatusUrl,
  massChangeStatusesUrl,
  massCopyRatesUrl,
  massResetRatesUrl,
  getUsersCustomRatesUrl,
  copyCustomRatesUrl,
  makeExportUrl,
  getCustomRatesForUser,
  getServicesList,
  updateCustomRates,
  getExportListUrl,
  getActivityLog,
  getSignInHistory,
} from '../../../../services/urls';

export const getUserDataAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_USER_DATA });

  try {
    const response = await getUserData(id);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_USER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USER_DATA_ERROR, error });
  }
};

export const onUpdateUserDataAction = (id, payload) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_DATA });

  try {
    const response = await updateUserData(id, payload);
    const { data } = response;

    dispatch({
      type: actionTypes.UPDATE_USER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_USER_DATA_ERROR });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const onCreateUserAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_USER });

  try {
    const response = await createUser(payload);
    const data = { response };

    dispatch({
      type: actionTypes.CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_USER_ERROR });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const onChangeUserStatus = (id, status) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_USER_STATUS });

  try {
    const response = await changeUserStatusUrl(id, status);
    const { data } = response;
    dispatch({
      type: actionTypes.CHANGE_USER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CHANGE_USER_STATUS_ERROR });
  }
};

export const onCopyCustomRates = (from, to) => async (dispatch) => {
  dispatch({ type: actionTypes.COPY_CUSTOM_RATES });

  try {
    await copyCustomRatesUrl(from, to);
    dispatch({ type: actionTypes.COPY_CUSTOM_RATES_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.COPY_CUSTOM_RATES_ERROR });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const onSetUserPassword = (id, password) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_USER_PASSWORD });

  try {
    await setUserPasswordUrl(id, password);
    dispatch({ type: actionTypes.SET_USER_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.SET_USER_PASSWORD_ERROR });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const onClearUserData = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_USER_DATA });
};

export const onMassChangeStatus = (status, users) => async (dispatch) => {
  dispatch({ type: actionTypes.MASS_CHANGE_STATUS });

  try {
    await massChangeStatusesUrl(status, users);
    dispatch({ type: actionTypes.MASS_CHANGE_STATUS_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.MASS_CHANGE_STATUS_ERROR });
  }
};

export const onMassResetRates = (users) => async (dispatch) => {
  dispatch({ type: actionTypes.MASS_RESET_RATES });

  try {
    await massResetRatesUrl(users);
    dispatch({ type: actionTypes.MASS_RESET_RATES_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.MASS_RESET_RATES_ERROR });
  }
};

export const onMassCopyRates = (fromUser, toUsers) => async (dispatch) => {
  dispatch({ type: actionTypes.MASS_COPY_RATES });

  try {
    await massCopyRatesUrl(fromUser, toUsers);
    dispatch({ type: actionTypes.MASS_COPY_RATES_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.MASS_COPY_RATES_ERROR });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const getUsersCustomRates = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_USERS_WITH_CUSTOM_RATES });

  try {
    const response = await getUsersCustomRatesUrl();
    const { data } = response;
    const { users } = data;

    dispatch({
      type: actionTypes.GET_USERS_WITH_CUSTOM_RATES_SUCCESS,
      payload: users,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USERS_WITH_CUSTOM_RATES_ERROR, error });
  }
};

export const getCustomRatesForUserAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_CUSTOM_RATES_FOR_USER });

  try {
    const response = await getCustomRatesForUser(id);
    const { data } = response;
    const { rates } = data;

    dispatch({
      type: actionTypes.GET_CUSTOM_RATES_FOR_USER_SUCCESS,
      data: rates,
      ratesUserId: id,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CUSTOM_RATES_FOR_USER_ERROR, error });
  }
};

export const getServicesListAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_SERVICES_LIST });

  try {
    const response = await getServicesList();
    const { data } = response;
    const { services } = data;

    dispatch({
      type: actionTypes.GET_SERVICES_LIST_SUCCESS,
      data: services,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SERVICES_LIST_ERROR, error });
  }
};

export const onUpdateCustomRatesAction = (id, payload) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_CUSTOM_RATES });

  try {
    await updateCustomRates(id, payload);

    dispatch({
      type: actionTypes.UPDATE_CUSTOM_RATES_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_CUSTOM_RATES_ERROR, error });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const getExportList = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_EXPORT_LIST });

  try {
    const response = await getExportListUrl(payload);
    const { data } = response;
    dispatch({
      type: actionTypes.GET_EXPORT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_EXPORT_LIST_ERROR, error });
  }
};

export const onMakeExport = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.MAKE_EXPORT });

  try {
    await makeExportUrl(payload);
    dispatch({ type: actionTypes.MAKE_EXPORT_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.MAKE_EXPORT_ERROR, error });
    if (error?.data?.error_message) {
      throw error.data.error_message;
    }
  }
};

export const getActivityLogAction = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ACTIVITY_LOG });

  try {
    const response = await getActivityLog(id);
    const { data } = response;

    dispatch({ type: actionTypes.GET_ACTIVITY_LOG_SUCCESS, data: data.logs });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ACTIVITY_LOG_ERROR, error });
  }
};

export const getSignInHistoryAction = (id, payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_SIGNIN_HISTORY });

  try {
    const response = await getSignInHistory(id, payload);
    const { data } = response;
    data.userId = id;

    dispatch({ type: actionTypes.GET_SIGNIN_HISTORY_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SIGNIN_HISTORY_ERROR, error });
  }
};
