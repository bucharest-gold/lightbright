'use strict';

const asyncHook = require('async-hook');
const filters = new Set();

const activate = function activate () {
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
  filter(createRecord(uid, 'init', { provider, parentUid }));
};

const pre = function pre (uid) {
  filter(createRecord(uid, 'pre'));
};

const post = function post (uid) {
  filter(createRecord(uid, 'post'));
};

const destroy = function destroy (uid) {
  filter(createRecord(uid, 'delete'));
};

const filter = function filter (record) {
  filters.forEach((f) => f(record));
};

const createRecord = function record (uid, step, data) {
  return {
    uid,
    step,
    data,
    timestamp: new Date().getTime()
  };
};

const hooks = { init, pre, post, destroy };

module.exports = exports = {
  activate,
  deactivate,
  addFilter,
  removeFilter
};
