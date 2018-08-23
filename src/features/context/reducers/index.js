import * as t from './../actionTypes';

export const initialState: State = {
  error: null,
  contextData: null,
  isLoad: false
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case t.ADD_CONTEXT: {
      return { ...state, isLoad: false, contextData: action.payload, };
    }

    default:
      return state;
  }
};