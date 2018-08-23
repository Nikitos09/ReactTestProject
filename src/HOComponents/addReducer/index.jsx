// @flow

import store, { injectAsyncReducer } from './../../store';

export default function addReducer(name, reducers) {
    injectAsyncReducer(store, name, reducers);
    return function (WrappedComponent) {
        return WrappedComponent
    };
}