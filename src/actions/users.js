import fetch from 'isomorphic-fetch';
import { FETCH_USERS } from '../constants/ActionTypes';
import { API_USERS } from '../constants/APIs';

function fetchUsersRequest() {
  return {
    status: 'request',
    type: FETCH_USERS
  };
}

function fetchUsersSuccess(data) {
  return {
    type: FETCH_USERS,
    status: 'success',
    items: data.items,
    page: data.page
  };
}

function fetchUsersFailure() {
  return {
    type: FETCH_USERS,
    status: 'error',
    error: 'Oops'
  };
}

/**
 * 获取菜单信息
 */
export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    return fetch(API_USERS)
      .then((response) => response.json())
      .then((response) => {
        dispatch(fetchUsersSuccess({
          items: response.result.items,
          page: response.page
        }));
      })
      .catch(function (error) {
        dispatch(fetchUsersFailure());
      });
  };
}
