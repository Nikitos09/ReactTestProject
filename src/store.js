// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import { all, fork } from 'redux-saga/effects';
import { createLogger } from 'redux-logger';
import rootReducer from "./reducers";
import fetch from './api';

const sagaMiddleware = createSagaMiddleware();

async function refreshTokens(refreshToken){
  try{
    localStorage.setItem("jwtAuth", JSON.stringify({
      token: refreshToken,
      refreshToken
    }));
    const response = await fetch.get('/auth/refresh/');

    localStorage.setItem("jwtAuth", JSON.stringify({
      token: response.data.token,
      refreshToken: response.data.refreshToken
    }));
  }
  catch(error){
    console.log(error.response);
  }
}

const  authChecker = store =>next=>async(action)=> {
  const auth = JSON.parse(localStorage.getItem("jwtAuth"));

  if(auth !== null && auth.token && auth.refreshToken && action.error!== undefined && action.error.status === 401){
    await refreshTokens(auth.refreshToken );
    next(action);
  }
    next(action);
}

function configureStore() {
  let middleware;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.NODE_ENV === 'development') {
    middleware = composeEnhancers(applyMiddleware(
      sagaMiddleware,
      authChecker,
      createLogger()
    ));
  } else {
    middleware = composeEnhancers(applyMiddleware(sagaMiddleware));
  }
  const store = createStore(rootReducer(), middleware);
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
}

export function injectAsyncSaga(asyncSaga) {
  function* rootSaga() {
    yield all(Object.keys(asyncSaga).map(sagaName => fork(asyncSaga[sagaName])));
  }
  sagaMiddleware.run(rootSaga).done.catch(error => console.warn(error));
}

export default configureStore();