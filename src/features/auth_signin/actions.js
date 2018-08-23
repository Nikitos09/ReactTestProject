// @flow

import * as t from './actionTypes';

export const sendForm = (data: any = {}) => ({
    type: t.SIGNIN,
    payload: data
});
  
export const refresh = () => ({
    type: t.REFRESH
});