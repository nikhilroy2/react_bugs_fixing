import { getNavbarConfigAction, setIsFirstRendering } from '../../../actions/header';

const header = (store) => (next) => (action) => {
  if (action.error) {
    switch (action.error.status) {
      case 401: {
        // do something
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
    case '@@router/LOCATION_CHANGE':
      store.dispatch(setIsFirstRendering(action.payload.isFirstRendering));
      break;

    default: {
      // do something
    }
  }

  if (
    !store.getState().header.isFirstRendering
        && action.type !== 'GET_SERVICES_LIST_SUCCESS'
        && (action.type === 'CHECK_AUTORIZATION_SUCCESS'
            || action.type.includes('VIEW_SUCCESS')
            || action.type.includes('LIST_SUCCESS'))
  ) {
    store.dispatch(getNavbarConfigAction());
  }

  if (action.type.includes('VIEW_SUCCESS') || action.type.includes('LIST_SUCCESS')) {
    store.dispatch(setIsFirstRendering(false));
  }

  return result;
};

export default header;
