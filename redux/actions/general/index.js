import * as actionTypes from '../../types/general';
import { switchViewModeUrl, getServicesList } from '../../../services/urls';

export const switchViewMode = (value) => async (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_VIEW_MODE });

  try {
    const response = await switchViewModeUrl(value);
    const { data } = response;
    const { dark_mode } = data;
    dispatch({
      type: actionTypes.CHANGE_VIEW_MODE_SUCCESS,
      payload: dark_mode,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHANGE_VIEW_MODE_ERROR,
      error,
    });
  }
};

export const getAutorization = () => ({
  type: actionTypes.CHECK_AUTORIZATION,
});

export const getAutorizationSuccess = (data) => ({
  type: actionTypes.CHECK_AUTORIZATION_SUCCESS,
  data,
});

export const getAutorizationError = (error) => ({
  type: actionTypes.CHECK_AUTORIZATION_ERROR,
  error,
});

export const getServicesListAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_SERVICES_LIST_ALL });

  try {
    const response = await getServicesList();
    const { data } = response;

    dispatch({ type: actionTypes.GET_SERVICES_LIST_ALL_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SERVICES_LIST_ALL_ERROR });
  }
};
