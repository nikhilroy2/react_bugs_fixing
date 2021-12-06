import { redirectNotFound } from '../../../actions/redirect';

const Redirect = (store) => (next) => (action) => {
  if (action.error && action.error.status) {
    switch (action.error.status) {
      case 404: {
        store.dispatch(redirectNotFound({ error: action.error }));
        break;
      }
      default: {
        // do something
      }
    }
  }

  const result = next(action);

  if (action.error && action.error.status) {
    if (action.error.status === 403 && action.error.statusText === 'Forbidden') {
      window.location.href = `${window.location.origin}/admin/logout?redirect=${window.location.pathname}${
        window.location.search ? `${window.location.search}` : ''
      }`;
    }
  }

  return result;
};

export default Redirect;
