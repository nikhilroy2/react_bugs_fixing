import * as actionTypes from '../../types/general';

const initState = {
  darkMode: 0,
  darkModeFetching: false,
  servicesFetching: false,
  error: false,
  auth: true,
  services: [],
};

const general = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_VIEW_MODE: {
      return {
        ...state,
        darkModeFetching: true,
      };
    }
    case actionTypes.CHANGE_VIEW_MODE_ERROR: {
      return {
        ...state,
        error: true,
        darkModeFetching: false,
      };
    }
    case actionTypes.CHANGE_VIEW_MODE_SUCCESS: {
      return {
        ...state,
        darkMode: action.payload,
        darkModeFetching: false,
      };
    }
    case actionTypes.CHECK_AUTORIZATION: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.CHECK_AUTORIZATION_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        auth: action.data,
        error: false,
      };
    }
    case actionTypes.CHECK_AUTORIZATION_ERROR: {
      return {
        ...state,
        isFetching: false,
        auth: false,
        error: true,
      };
    }

    case actionTypes.GET_SERVICES_LIST_ALL: {
      return {
        ...state,
        servicesFetching: true,
      };
    }
    case actionTypes.GET_SERVICES_LIST_ALL_SUCCESS: {
      return {
        ...state,
        servicesFetching: false,
        services: action.data.services,
      };
    }
    case actionTypes.GET_SERVICES_LIST_ALL_ERROR: {
      return {
        ...state,
        servicesFetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default general;
