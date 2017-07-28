module.exports = {
  path: 'repos',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Repos').default);
  }
};
