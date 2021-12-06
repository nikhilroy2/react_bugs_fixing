import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import tickets from './tickets';
import header from './header';
import general from './general';
import users from './users';
import refill from './refill';
import orders from './orders';
import redirect from './redirect';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  header,
  general,
  tickets,
  users,
  refill,
  orders,
  redirect,
});

export default createRootReducer;
