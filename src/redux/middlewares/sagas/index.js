import { all } from 'redux-saga/effects';

import watchCheckAuthSaga from './general'

export default function* rootSaga() {
  yield all([
    watchCheckAuthSaga(),
  ])
}
