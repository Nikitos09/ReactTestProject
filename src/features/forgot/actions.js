// @flow

import * as t from './actionTypes';

export const sendForm = (data: any = {}) => ({
    type: t.FORGOT_PASSWORD,
    payload: data
});
  
export const refresh = () => ({
    type: t.REFRESH
});