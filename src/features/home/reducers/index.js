// @flow
import * as t from './../actionTypes';
import type { State } from './../types';

export const initialState: State = {
  error: null,
  pageData: null,
  isLoad: false
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case t.LOAD_UP: {
      return { ...state, isLoad: true, error: null };
    }
    case t.LOAD_UP_FAILED: {
      return { ...state, isLoad: false, error: action.error };
    }
    case t.LOAD_UP_SUCCEEDED: {
      return { ...state, isLoad: false, pageData: action.payload };
    }

    case t.REFRESH: {
      return initialState;
    }

    default:
      return state;
  }
};