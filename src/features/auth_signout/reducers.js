// @flow
import * as t from './actionTypes';
import type { State } from './types';

export const initialState: State = {
  error: null,
  pageData: null,
  isLoad: false,
  isClear: false,
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case t.SIGNOUT: {
      return initialState;
    }
    case t.SIGNOUT_FAILED: {
      return { ...state, isLoad: false, error: action.error, isClear: false };
    }
    case t.SIGNOUT_SUCCEEDED: {
      return { ...state, isLoad: false, pageData: action.payload, isClear: true };
    }

    case t.REFRESH: {
      return initialState;
    }

    default:
      return state;
  }
};