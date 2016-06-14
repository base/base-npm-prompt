/*!
 * base-npm-prompt (https://github.com/node-base/base-npm-prompt)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('base:npm:prompt');

module.exports = function(app) {
  return function(prop, cb) {
    if (typeof cb !== 'function') {
      cb(new Error('expected a callback function'));
      return;
    }

    if (typeof prop !== 'string') {
      cb(new TypeError('expected prop to be a "dependencies" or "devDependencies"'));
      return;
    }

    if (typeof app.npm === 'undefined') {
      cb(new Error('expected the base-npm plugin to be registered'));
      return;
    }

    debug('prompting for npm %s', prop);

    var queue = filterKeys(app, prop);
    if (queue.length === 0) {
      cb();
    } else if (queue.length === 1) {
      installOne(app, prop, queue[0], cb);
    } else {
      installArray(app, prop, queue, cb);
    }

    function installOne(app, prop, name, cb) {
      var methods = {dependencies: 'save', devDependencies: 'saveDev'};
      var key = prop + '-confirm';
      app.confirm(key, 'Want to install "' + name + '" to ' + prop + '?');
      app.ask(key, {save: false}, function(err, answers) {
        if (err) return cb(err);
        var method = methods[prop];
        if (answers[key] && method) {
          app.npm[method](name, cb);
        } else {
          cb();
        }
      });
    }

    function installArray(app, prop, queue, cb) {
      var methods = {dependencies: 'save', devDependencies: 'saveDev'};
      var key = prop + '-choices';
      app.choices(key, 'Want to install ' + prop + '?', queue);
      app.ask(key, {save: false}, function(err, answers) {
        if (err) return cb(err);

        var answer = answers[key];
        var method = methods[prop];
        if (Array.isArray(answer) && method) {
          app.npm[method](answer, cb);
        } else {
          cb();
        }
      });
    }

    function filterKeys(app, prop) {
      if (!app.pkg || !app.pkg.data) return [];
      var depKeys = Object.keys(app.pkg.get(prop) || {});
      return (app.get(['cache.install', prop]) || []).filter(function(name) {
        return depKeys.indexOf(name) === -1;
      });
    }
  };
};

