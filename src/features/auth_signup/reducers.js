import * as t from './actionTypes';
import type { State } from './types';

export const initialState: State = {
  error: null,
  pageData: null,
  isLoad: false
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case t.SIGNUP: {
      return { ...state, isLoad: true, error: null };
    }
    case t.SIGNUP_FAILED: {
      return { ...state, isLoad: false, error: action.error };
    }
    case t.SIGNUP_SUCCEEDED: {
      return { ...state, isLoad: false, pageData: action.payload };
    }

    case t.REFRESH: {
      return initialState;
    }

    default:
      return state;
  }
};