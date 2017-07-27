import { setCookie, getCookie } from './cookie';

const useStorage = window.localStorage ? true : false;

export function setItem(key, value, type = 'session') {

  if (useStorage) {
    return window[`${type}Storage`].setItem(key, value);
  }

  return setCookie(key, value, {
    expires: new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)),
    path: '/'
  });
}

export function getItem(key, type = 'session') {
  if (useStorage) {
    return window[`${type}Storage`].getItem(key);
  }
  return getCookie(key);
}


export function setItemByUid(key, value, uid) {
  setItem(`_.${uid}.${key}`, value);
}

export function getItemByUid(key) {

  const uid = getItem('uid');
  if (uid) {
    return getItem(`_.${uid}.${key}`);
  }
  return getItem(key);
}

export default {
  setItem,
  getItem
};