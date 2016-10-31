'use strict';

const asyncWrap = process.binding('async_wrap');
const filters = new Set();

const enable = function activate () {
  if (!filters.length) {
    throw new Error('You need to add a filter to be able to get the results.');
  }
  asyncWrap.enable();
};

const disable = function deactivate () {
  filters.clear();
  asyncWrap.disable();
};

const addFilter = function addFilter (f) {
  if (typeof f === 'function') {
    filters.add(f);
  } else {
    throw new TypeError('Filter must be a function');
  }
};

const removeFilter = function removeFilter (f) {
  return filters.delete(f);
};

const clearFilters = function clearFilters () {
  return filters.clear();
};

const init = function init (uid, provider, parentUid, parentHandle) {
  filter(createRecord(uid, 'init', this, provider, { parentUid, parentHandle }));
};

const pre = function pre (uid) {
  filter(createRecord(uid, 'pre', this));
};

const post = function post (uid, didThrow) {
  this.didThrow = didThrow;
  filter(createRecord(uid, 'post', this));
};

const destroy = function destroy (uid) {
  filter(createRecord(uid, 'delete'));
};

const filter = function filter (record) {
  filters.forEach((f) => f(record));
};

const createRecord = function record (uid, step, handle, provider, parent) {
  return {
    uid,
    step,
    handle,
    provider,
    parent,
    timestamp: Date.now()
  };
};

asyncWrap.setupHooks({ init, pre, post, destroy });

module.exports = exports = {
  enable,
  disable,
  addFilter,
  removeFilter,
  clearFilters
};
