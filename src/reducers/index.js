import { combineReducers } from 'redux';
import events from './events';
import settings from './settings';
import repos from './repos';
import users from './users';
import login from './login';

const app = combineReducers({
  events,
  repos,
  settings,
  users,
  login
});

export default app;
