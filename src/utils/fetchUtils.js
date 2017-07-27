import fetch from 'isomorphic-fetch';
import fetchJsonp from './fetchJsonp';
import status from '../constants/ResponseStatus';
import checkResponseCode from './checkResponseCode';
import checkDataStatus from './checkDataStatus';
import { spliceURL } from './urlUtils';

const listenedHttpCodes = [500, 403, 404];


export function checkHttpStatus(dispatch) {

  return (response) => {
    const { status, statusText } = response;

    if ((status >= 200 && status < 300) || listenedHttpCodes.indexOf(status) != -1) {
      return response;
    } else {
      const { status, statusText } = response;
      let message = status === 504 ? '数据请求超时：504' :
        `API 请求错误 ${statusText} : ${status}`;
      dispatch && dispatch(addNotification({
        message,
        level: 'error',
        onRemove(item) {
          dispatch(removeNotification(item.uid));
        }
      }));
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };

}

export function parseJSON(response) {
  return response.json();
}


export function stringifyJSON(data) {
  return JSON.stringify({ data: data });
}


export function fetchJson(url, options = {}) {
  const defaultOptions = {
    method: 'get',

    //Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  let args = { ...options }; // copy options

  if (args.params) {
    for (let key in args.params) {
      if (args.params[key] === '') {
        delete args.params[key];
      }
    }
  }
  let nextURL = spliceURL(url, args.params);

  if (args.params) {
    delete args.params;
  };

  return fetch(nextURL, Object.assign({}, defaultOptions, args));
}


/**
 * 创建异步获取数据的 3个Action: request, failure, success
 * @param  {String} ACTION
 * @param  {Bool} noWait=false  不允许等待, 如果设置为true就不返回request这个action
 * @param  {Object} actionProps={}
 */
export function createFetchAction(ACTION, noWait = false, options = {}) {

  const request = options.request || function (actionProps) {
    return {
      type: ACTION,
      status: status.REQUEST,
      response: {}, ...actionProps
    };
  };

  const failure = options.failure || function (error, actionProps) {
    return {
      type: ACTION,
      status: status.ERROR,
      error: error,
      response: {}, ...actionProps
    };
  };

  const success = options.success || function (data, actionProps) {
    return {
      type: ACTION,
      status: status.SUCCESS,
      response: data, ...actionProps
    };
  };


  //如果不允许等待
  if (noWait) {
    return { failure, success };
  }

  return { request, failure, success };
}

function actionCreatorWrapper(fn, dispatch) {
  return (...args) => {
    if (!fn || !dispatch) {
      return;
    }
    let action = fn(...args);
    if (action && action.type) {
      dispatch(action);
    }
  };
}

export function fetchData(url, options, cb) {

  const {
    actionProps,
    action = {},
    beforeSend,
    success,
    complete,
    error,
    query = {},
    type,
    ...fetchOptions
  } = options;

  const fetchFunc = type === 'jsonp' ? fetchJsonp : fetchJson;

  return (dispatch) => {

    const beforeSendCallback = actionCreatorWrapper(beforeSend, dispatch);
    const successCallback = actionCreatorWrapper(success, dispatch);
    const completeCallback = actionCreatorWrapper(complete, dispatch);
    const errorCallback = actionCreatorWrapper(error, dispatch);

    action.request && dispatch(action.request(actionProps));
    beforeSendCallback(dispatch);


    return fetchFunc(url, fetchOptions)
      .then(checkHttpStatus(dispatch))
      .then(parseJSON)
      .then((data) => {

        const response = checkResponseCode(data);
        if (checkDataStatus(response, dispatch, options)) {
          if (action.success) {
            const successAction = action.success(response, actionProps);
            dispatch(successAction);
          }
          successCallback(response, dispatch);
        } else {
          action.failure && dispatch(action.failure('fetch error', actionProps));
        }

        completeCallback(response, dispatch);
        return data;
      })
      .catch((err) => {

        console.error('fetchFunc error => ', err);
        console.error('fetchFunc error => ', url, options);

        errorCallback(err, dispatch);
        completeCallback(err, dispatch);
      }).then(cb);


  };

}

