// @flow

import * as t from './../../actionTypes';
import { FORM_NAME } from './../../constants';
import { stopSubmit } from 'redux-form';
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from './../../../../api';

export function* sendForm(action: any): any {
  try {
    const response = yield call(fetch.post, '/auth/signup/', {
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password
    });    
    yield put({
      type: t.SIGNUP_SUCCEEDED,
      payload: { ...response, user_id: action.payload.email }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.SIGNUP_FAILED,
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
  yield takeEvery(t.SIGNUP, sendForm);
}