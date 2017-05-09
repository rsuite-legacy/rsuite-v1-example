module.exports = {
  path: 'events',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Events/Index').default);
  }
};
