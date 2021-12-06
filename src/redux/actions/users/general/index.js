import * as actionTypes from '../../../types/users';
import {
  getUsersList,
  getUserConfigsUrl,
} from '../../../../services/urls';

export const getUserConfigs = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_USERS_CONFIGS });

  try {
    const response = await getUserConfigsUrl();
    const { data } = response;

    dispatch({
      type: actionTypes.GET_USERS_CONFIGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USERS_CONFIGS_ERROR, error });
  }
}

export const getUsersListAction = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_USERS_LIST });

  try {
    const response = await getUsersList(payload);
    const { data } = response;

    dispatch({
      type: actionTypes.GET_USERS_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USERS_LIST_ERROR,
      error,
    });
  }
};
