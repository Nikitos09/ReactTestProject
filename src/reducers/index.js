import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    form: formReducer,
    ...asyncReducers
  });
}