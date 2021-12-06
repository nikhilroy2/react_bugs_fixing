import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import Tickets from './custom/tickets';
import Header from './custom/header';
import General from './custom/general';
import Redirect from './custom/redirect';
import Users from './custom/users';
import Orders from './custom/orders';
import Refill from './custom/refill';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = (history) => applyMiddleware(
  routerMiddleware(history),
  Redirect,
  thunk,
  sagaMiddleware,
  // custom
  Tickets,
  Header,
  General,
  Users,
  Orders,
  Refill,
);

export default middlewares;
