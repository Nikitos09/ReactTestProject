// @flow

import * as t from './actionTypes';

export const sendForm = (data: any = {}) => ({
    type: t.RESET_PASSWORD,
    payload: data
});
  
export const refresh = () => ({
    type: t.REFRESH
});