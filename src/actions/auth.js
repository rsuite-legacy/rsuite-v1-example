import fetch from 'isomorphic-fetch';
import { LOGIN } from '../constants/ActionTypes';

export function login() {
  return {
    status: 'success',
    type: login
  };
}
