module.exports = {
  path: 'users',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Users').default);
  }
};
