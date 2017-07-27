import { combineReducers } from 'redux';
import events from './events';
import settings from './settings';
import repos from './repos';
import users from './users';

const app = combineReducers({
  events,
  repos,
  settings,
  users
});

export default app;
