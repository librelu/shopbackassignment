'use strict';

const errorsUtils = require('../lib/utils/errors/'),
  ASSETS_PATH = '/shopback/static/assets';

class RedirectPathMiddleware {
  constructor(options) {
    let opt = {
      paths: [],
      ...options,
    };
    validatePaths(opt.paths);
    this.options = opt;
  }

  get paths() {
    return this.options.paths;
  }

  redirectToAssetsMiddleware(req, _, next) {
    if (req.method == 'GET') {
      this.paths.forEach((path) => {
        req.path = req.path.replace(path, ASSETS_PATH);
      });
    }
    next();
  }
}

function validatePaths(paths) {
  if (typeof paths != typeof []) {
    throw new errorsUtils.ValidationError(
      `paths should be array type, current:${typeof paths} value:${paths}`
    );
  }

  if (paths.length === 0) {
    throw new errorsUtils.ValidationError(
      `paths should insert at least one, value:${paths}`
    );
  }
}

module.exports = RedirectPathMiddleware;
