import * as t from './../../actionTypes';
import * as g from './../../../context/actionTypes'
import { FORM_NAME } from './../../constants';
import { stopSubmit } from 'redux-form';
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from './../../../../api';

export function* sendForm(action: any): any {
  try {
    const response = yield call(fetch.post, '/auth/signin', action.payload);
    const jwtAuth = response.data;
    
    localStorage.setItem("jwtAuth", JSON.stringify(jwtAuth));
    yield put({
      type: g.ADD_CONTEXT,
      payload: response.data
    });
    yield put({
      type: t.SIGNIN_SUCCEEDED,
      payload: { ...response, user_id: action.payload.username }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.SIGNIN_FAILED,
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
  yield takeEvery(t.SIGNIN, sendForm);
}