import * as t from './../../actionTypes';
import { FORM_NAME } from './../../constants';
import { stopSubmit } from 'redux-form';
import { put, takeEvery } from 'redux-saga/effects';

export function* logOut(action: any): any {
  try {
    localStorage.clear();
    yield put({
      type: t.SIGNOUT_SUCCEEDED,
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.SIGNOUT_FAILED,
      error: {
        message: response.data.message || error.message,
        stack: error.stack,
        status: error.response && error.response.status,
        statusText: error.response && error.response.statusText
      }
    });
    yield put(
      stopSubmit(FORM_NAME, {
        _error: response.data.message || 'Произошла серверная ошибка'
      })
    );
  }
}

export default function* watcherSendForm(): any {
  yield takeEvery(t.SIGNOUT, logOut);
}