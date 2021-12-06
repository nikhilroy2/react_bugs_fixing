import * as actionTypes from '../../types/header';

const initialState = {
  isFetching: false,
  error: false,
  navbarConfig: {},
  accessRoutes: [],
  isFirstRendering: null,
};

const header = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NAVBAR: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case actionTypes.GET_NAVBAR_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        navbarConfig: action.data,
        accessRoutes: action.menu,
      };
    }

    case actionTypes.GET_NAVBAR_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    }

    case actionTypes.SET_FIRST_RENDERING: {
      return {
        ...state,
        isFirstRendering: action.payload,
      };
    }

    default: {
      break;
    }
  }

  return state;
};

export default header;
