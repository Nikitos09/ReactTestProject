// @flow

import { injectAsyncSaga } from './../../store';

export default function withSaga({sagas}) {
    injectAsyncSaga(sagas);
    return function (WrappedComponent) {
        return WrappedComponent
    };
}