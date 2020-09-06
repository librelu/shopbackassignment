'use strict';

var errorsUtils = require('../lib/utils/errors/');

class RedirectPathMiddleware {
  constructor(options) {
    options = {
      paths: [],
      ...options,
    };
    if (options.paths.length === 0 || options.paths.length === 'undefined') {
      throw new errorsUtils.ValidationError('paths should insert at least one');
    }
    this.options = options;
  }

  get paths() {
    return this.options.paths;
  }
}

module.exports = RedirectPathMiddleware;
