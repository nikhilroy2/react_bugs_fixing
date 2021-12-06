import * as actionTypes from '../../types/header';
import * as actionTypesGeneral from '../../types/general';
import { getNavbarConfig } from '../../../services/urls';

export const getNavbarConfigAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_NAVBAR })

  try {
    const response = await getNavbarConfig();
    const { data } = response;

    dispatch({
      type: actionTypes.GET_NAVBAR_SUCCESS,
      data,
      menu: data.menu,
    })

    dispatch({
      type: actionTypesGeneral.CHANGE_VIEW_MODE_SUCCESS,
      payload: data.dark_mode,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_NAVBAR_ERROR, error });
  }
}

export const setIsFirstRendering = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_FIRST_RENDERING,
    payload: value,
  });
}
