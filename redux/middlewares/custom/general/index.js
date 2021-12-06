import * as actionTypes from '../../../types/general';

const general = (store) => (next) => (action) => {
  if (action.error) {
    switch (action.error.status) {
      case 401: {
        break;
      }
      case 403: {
        // do something
        break;
      }
      case 404: {
        // do something
        break;
      }
      default: {
        // do something
      }
    }
  }

  const result = next(action);

  switch (action.type) {
    case actionTypes.CHANGE_VIEW_MODE_SUCCESS: {
      if (store.getState().general.darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementsByTagName('html')[0].classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        document.getElementsByTagName('html')[0].classList.remove('dark-mode');
      }
      break;
    }
    default: {
      // do something
    }
  }

  return result;
};

export default general;
