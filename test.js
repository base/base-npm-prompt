'use strict';

require('mocha');
var assert = require('assert');
var prompt = require('./');

describe('base-npm-prompt', function() {
  it('should export a function', function() {
    assert.equal(typeof prompt, 'function');
  });

  it('should export an object', function() {
    assert(prompt);
    assert.equal(typeof prompt, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      prompt();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
