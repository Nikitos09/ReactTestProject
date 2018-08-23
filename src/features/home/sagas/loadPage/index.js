// @flow

import * as t from './../../actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from './../../../../api';

export function* loadPage(action: any): any {
  try {
    const response = yield call(fetch.get, '/api/home', {
      auth: action.payload
    });
    yield put({
      type: t.LOAD_UP_SUCCEEDED,
      payload: { ...response, user_id: action.payload.username }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.LOAD_UP_FAILED,
      error: {
        message: response.data.message || error.message,
        stack: error.stack,
        status: error.response && error.response.status,
        statusText: error.response && error.response.statusText
      }
    });
  }
}

export default function* watcherloadPage(): any {
  yield takeEvery(t.LOAD_UP, loadPage);
}