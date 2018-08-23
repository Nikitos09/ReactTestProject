// @flow

import * as t from './actionTypes';

export const logOut = (data: any = {}) => ({
    type: t.SIGNOUT,
    payload: data
});
  
export const refresh = () => ({
    type: t.REFRESH
});