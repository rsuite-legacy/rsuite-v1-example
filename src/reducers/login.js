
import { LOGIN } from '../constants/ActionTypes';


const initialState = {
  data: []
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        status: action.status
      });
    default:
      return state;
  }
};
