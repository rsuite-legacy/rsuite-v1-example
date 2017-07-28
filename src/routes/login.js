module.exports = {
  path: 'login',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Login').default);
  }
};
