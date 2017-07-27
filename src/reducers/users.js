import { FETCH_USERS } from '../constants/ActionTypes';


const initialState = {
  data: [],
  page: {},
  status: ''
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        status: action.status,
        data: action.items || [],
        page: action.page || {}
      });

    default:
      return state;
  }
}