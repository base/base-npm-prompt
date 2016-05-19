/*!
 * base-npm-prompt (https://github.com/node-base/base-npm-prompt)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('base-npm-prompt');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('base-npm-prompt')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.define('prompt', function() {
      debug('running prompt');
      
    });
  };
};
