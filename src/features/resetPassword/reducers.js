// @flow
import * as t from './actionTypes';
import type { State } from './types';

export const initialState: State = {
  error: null,
  isSuccess: null,
  pageData: null,
  isLoad: false,
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case t.RESET_PASSWORD: {
      return { ...state, isLoad: true, error: null };
    }
    case t.RESET_PASSWORD_FAILED: {
      return { ...state, isLoad: false, error: action.error };
    }
    case t.RESET_PASSWORD_SUCCEEDED: {
      return { ...state, isLoad: false, pageData: action.payload, isSuccess: action.isSuccess };
    }

    case t.REFRESH: {
      return initialState;
    }

    default:
      return state;
  }
};