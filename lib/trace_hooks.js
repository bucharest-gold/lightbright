'use strict';

const asyncHook = require('async-hook');
const filters = new Set();

const actiavte = function activate () {
  asyncHook.addHooks(hooks);
  asyncHook.enable();
};

const deactivate = function deactivate () {
  filters.clear();
  asyncHook.disable();
  asyncHook.removeHooks(hooks);
};

const addFilter = function addFilter (f) {
  if (typeof f === 'function') {
    filters.add(f);
  }
};

const removeFilter = function removeFilter (f) {
  filters.delete(f);
};

const init = function init (uid, _, provider, parentUid) {
  filter({
    uid,
    provider,
    parentUid,
    step: 'init',
    timestamp: new Date().getTime()
  });
};

const pre = function pre (uid) {
  filter({
    uid,
    step: 'pre',
    timestamp: new Date().getTime()
  });
};

const post = function post (uid) {
  filter({
    uid,
    step: 'post',
    timestamp: new Date().getTime()
  });
};

const destroy = function destroy (uid) {
  filter({
    uid,
    step: 'delete',
    timestamp: new Date().getTime()
  });
};

const filter = function filter (record) {
  filters.forEach((f) => f(record));
};

const hooks = { init, pre, post, destroy };

module.exports = exports = {
  activate: actiavte,
  deactivate: deactivate,
  addFilter: addFilter,
  removeFilter: removeFilter
};

// const log = function log (msg) {
//   process._rawDebug(msg.toString());
// };

