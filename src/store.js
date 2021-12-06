import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './redux/reducers';
import middlewares, { sagaMiddleware } from './redux/middlewares';
import { history } from './history';
import rootSaga from './redux/middlewares/sagas';

import { IS_LOCAL } from './utils/config';

export const store = createStore(createRootReducer(history), IS_LOCAL ? composeWithDevTools(middlewares(history)) : middlewares(history));

sagaMiddleware.run(rootSaga);

export default store;
