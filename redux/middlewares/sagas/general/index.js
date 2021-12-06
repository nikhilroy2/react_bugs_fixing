/* import/no-extraneous-dependencies: off */
import { put, takeEvery } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';

import { getAutorizationSuccess, getAutorizationError } from '../../../actions/general';
import * as actionTypes from '../../../types/general';
import { checkAutorization } from '../../../../services/urls';

function* checkAuthSaga() {
  try {
    while (true) {
      const response = yield checkAutorization();
      const { data } = response;
      yield delay(180000);
      yield put(getAutorizationSuccess(data.auth));
    }
  } catch (e) {
    yield put(getAutorizationError(e));
  }
}

export default function* watchCheckAuthSaga() {
  yield takeEvery(actionTypes.CHECK_AUTORIZATION, checkAuthSaga)
}
