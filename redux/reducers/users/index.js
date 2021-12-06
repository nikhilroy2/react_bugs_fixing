import * as actionTypes from '../../types/users';

const userDataInit = {
  username: '',
  email: '',
  skype: '',
  first_name: '',
  last_name: '',
  password: '',
  payment: [],
  payment_methods: [],
};

const initialState = {
  isFetching: false,
  configFetching: false,
  keyFetching: false,
  ratesFetching: false,
  servicesFetching: false,
  exportListFetching: false,
  error: false,
  data: {},
  userData: userDataInit,
  config: {
    export_formats: [],
  },
  actionFetching: false,
  usersCustomRates: [],
  userRates: [],
  ratesUserId: null,
  servicesList: [],
  exportData: {
    exports: [],
  },
  activityLog: [],
  signInHistory: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_USER_DATA: {
      return {
        ...state,
        userData: userDataInit,
        userRates: [],
        ratesUserId: null,
        servicesList: [],
        activityLog: [],
        signInHistory: [],
      };
    }

    case actionTypes.GET_CUSTOM_RATES_FOR_USER_SUCCESS: {
      return {
        ...state,
        ratesFetching: false,
        userRates: action.data,
        ratesUserId: action.ratesUserId,
      };
    }

    case actionTypes.GET_SERVICES_LIST: {
      return {
        ...state,
        servicesFetching: true,
      };
    }

    case actionTypes.GET_SERVICES_LIST_SUCCESS: {
      return {
        ...state,
        servicesFetching: false,
        servicesList: action.data,
      };
    }

    case actionTypes.GET_CUSTOM_RATES_FOR_USER: {
      return {
        ...state,
        ratesFetching: true,
      };
    }

    case actionTypes.GET_CUSTOM_RATES_FOR_USER_ERROR:
    case actionTypes.GET_SERVICES_LIST_ERROR: {
      return {
        ...state,
        ratesFetching: false,
        servicesFetching: false,
        error: true,
      };
    }

    case actionTypes.GET_USERS_WITH_CUSTOM_RATES_SUCCESS: {
      return {
        ...state,
        usersCustomRates: action.payload,
      };
    }
    case actionTypes.GET_USERS_WITH_CUSTOM_RATES_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case actionTypes.GET_USERS_CONFIGS: {
      return {
        ...state,
        configFetching: true,
      };
    }
    case actionTypes.GET_EXPORT_LIST: {
      return {
        ...state,
        exportListFetching: true,
      };
    }
    case actionTypes.GET_USERS_LIST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case actionTypes.GET_USERS_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }

    case actionTypes.GET_USERS_LIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    }

    case actionTypes.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
        keyFetching: false,
        ratesFetching: false,
      };
    }
    case actionTypes.COPY_CUSTOM_RATES:
    case actionTypes.UPDATE_USER_DATA:
    case actionTypes.CREATE_USER:
    case actionTypes.SET_USER_PASSWORD:
    case actionTypes.MASS_RESET_RATES:
    case actionTypes.MASS_COPY_RATES:
    case actionTypes.MASS_CHANGE_STATUS:
    case actionTypes.CHANGE_USER_STATUS:
    case actionTypes.UPDATE_CUSTOM_RATES: {
      return {
        ...state,
        actionFetching: true,
      };
    }
    case actionTypes.COPY_CUSTOM_RATES_ERROR:
    case actionTypes.COPY_CUSTOM_RATES_SUCCESS:
    case actionTypes.UPDATE_USER_DATA_ERROR:
    case actionTypes.CREATE_USER_ERROR:
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
    case actionTypes.CREATE_USER_SUCCESS:
    case actionTypes.SET_USER_PASSWORD_ERROR:
    case actionTypes.SET_USER_PASSWORD_SUCCESS:
    case actionTypes.MASS_RESET_RATES_SUCCESS:
    case actionTypes.MASS_COPY_RATES_SUCCESS:
    case actionTypes.MASS_CHANGE_STATUS_SUCCESS:
    case actionTypes.MASS_RESET_RATES_ERROR:
    case actionTypes.MASS_COPY_RATES_ERROR:
    case actionTypes.MASS_CHANGE_STATUS_ERROR:
    case actionTypes.CHANGE_USER_STATUS_ERROR:
    case actionTypes.CHANGE_USER_STATUS_SUCCESS:
    case actionTypes.UPDATE_CUSTOM_RATES_SUCCESS:
    case actionTypes.UPDATE_CUSTOM_RATES_ERROR: {
      return {
        ...state,
        actionFetching: false,
      };
    }
    case actionTypes.GET_EXPORT_LIST_ERROR:
    case actionTypes.GET_USERS_CONFIGS_ERROR: {
      return {
        ...state,
        exportListFetching: false,
      };
    }
    case actionTypes.GET_EXPORT_LIST_SUCCESS: {
      return {
        ...state,
        exportListFetching: false,
        exportData: action.payload,
      };
    }
    case actionTypes.GET_USERS_CONFIGS_SUCCESS: {
      return {
        ...state,
        configFetching: false,
        config: action.payload,
      };
    }

    case actionTypes.GET_USER_DATA: {
      return {
        ...state,
        ratesFetching: true,
      };
    }

    case actionTypes.GET_USER_DATA_ERROR: {
      return {
        ...state,
        keyFetching: false,
        ratesFetching: false,
      };
    }

    case actionTypes.GET_ACTIVITY_LOG: {
      return {
        ...state,
        ratesFetching: true,
      };
    }

    case actionTypes.GET_ACTIVITY_LOG_SUCCESS: {
      return {
        ...state,
        activityLog: action.data,
        ratesFetching: false,
      };
    }

    case actionTypes.GET_ACTIVITY_LOG_ERROR: {
      return {
        ...state,
        ratesFetching: false,
      };
    }

    case actionTypes.GET_SIGNIN_HISTORY: {
      return {
        ...state,
        ratesFetching: true,
      };
    }

    case actionTypes.GET_SIGNIN_HISTORY_SUCCESS: {
      return {
        ...state,
        signInHistory: action.data,
        ratesFetching: false,
      };
    }

    case actionTypes.GET_SIGNIN_HISTORY_ERROR: {
      return {
        ...state,
        ratesFetching: false,
      };
    }

    default: {
      break;
    }
  }

  return state;
};

export default users;
