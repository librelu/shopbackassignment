'use strict';

const errorsUtils = require('./utils/errors'),
  HEADER_SHOPBACK_AGENT = 'X-SHOPBACK-AGENT',
  AGENT_1_VALUE = 'AGENT_1',
  CONTENT_TYPE = 'Content-Type',
  APPLICATION_JSON = 'application/json',
  SHOPBACK_RESOURCE_PATH = '/shopback/resource',
  SHOPBACK_ME_PATH = '/shopback/me',
  SHOPBACK_DOMAIN_NAME = 'www.shopback.com',
  SHOPBACK_APIS_PATH = '/shopback/api/*',
  SHOPBACK_SENDER = 'hello@shopback.com',
  ASSETS_PATH = '/shopback/static/assets';

class MiddlewareProvider {
  redirectToAssetsMiddleware(req, _, next) {
    if (req.method.toUpperCase() === 'GET') {
      let regex = new RegExp('^' + SHOPBACK_RESOURCE_PATH);
      req.path = req.path.replace(regex, ASSETS_PATH);
    }
    next();
  }

  cookieMatcherMiddleware(req, _, next) {
    if (req.method.toUpperCase() != 'GET') {
      throw new errorsUtils.BadRequestError(
        'cookie matcher should only accept GET method'
      );
    }

    let regex = new RegExp('^' + SHOPBACK_ME_PATH);
    if (!req.path.match(regex)) {
      throw new errorsUtils.BadRequestError(
        `cookie matcher should matched the path, current path: ${SHOPBACK_ME_PATH}`
      );
    }

    if (Object.keys(req.cookies).length === 0) {
      throw new errorsUtils.BadRequestError(
        'should contain cookies when requesting this endpoint'
      );
    }

    next();
  }

  domainNameCheckerMiddleware(req, _, next) {
    let regex = new RegExp('^' + SHOPBACK_DOMAIN_NAME + '$');
    if (req.method.toUpperCase() != 'GET') {
      throw new errorsUtils.BadRequestError(
        'domain checker should only accept GET method'
      );
    }
    if (!req.get('host').match(regex)) {
      throw new errorsUtils.BadRequestError(
        'domain name should be matched as expected'
      );
    }
    next();
  }

  addFromMiddleware(req, res, next) {
    let regex = new RegExp('^' + SHOPBACK_APIS_PATH);
    if (req.method.toUpperCase() != 'GET') {
      throw new errorsUtils.BadRequestError(
        'add from should only accept GET method'
      );
    }

    if (!req.path.match(regex)) {
      throw new errorsUtils.BadRequestError(
        'domain name should be matched as expected'
      );
    }

    res.set('From', SHOPBACK_SENDER);
    next();
  }

  trimQueryStringMiddleware(req, _, next) {
    let regex = new RegExp(/[\w\W]+?\?/);
    if (
      req.method.toUpperCase() === 'POST' ||
      req.method.toUpperCase() === 'PUT'
    ) {
      let matches = regex.exec(req.path);
      if (matches != null) {
        req.path = matches[0].replace('?', '');
      }
    }
    next();
  }

  checkShopBackAgentMiddleware(req, _, next) {
    if (
      req.method.toUpperCase() === 'POST' ||
      req.method.toUpperCase() === 'PUT'
    ) {
      if (
        req.headers != undefined &&
        req.headers[HEADER_SHOPBACK_AGENT] != undefined &&
        req.headers[HEADER_SHOPBACK_AGENT] != ''
      ) {
        next();
      } else {
        throw new errorsUtils.BadRequestError(
          'shopback agent should contains correct header in request'
        );
      }
    } else {
      throw new errorsUtils.BadRequestError(
        'shopback agent should accept only POST and PUT'
      );
    }
  }

  checkIsJSONApplicationMiddleware(req, _, next) {
    if (
      req.method.toUpperCase() === 'POST' ||
      req.method.toUpperCase() === 'PUT'
    ) {
      if (
        req.headers != undefined &&
        req.headers[CONTENT_TYPE] === APPLICATION_JSON
      ) {
        next();
      } else {
        throw new errorsUtils.BadRequestError(
          'check is json application should only support application/json with Content-Type header'
        );
      }
    } else {
      throw new errorsUtils.BadRequestError(
        'check is json application should contains correct header in request'
      );
    }
  }

  checkXShopbackAgentWhenDeleteMiddleware(req, _, next) {
    if (req.method.toUpperCase() != 'DELETE') {
      throw new errorsUtils.BadRequestError(
        'check x-shopback-agent should only apply with delete method'
      );
    }
    if (
      req.headers != undefined &&
      req.headers[HEADER_SHOPBACK_AGENT] === AGENT_1_VALUE
    ) {
      next();
    } else {
      throw new errorsUtils.BadRequestError(
        'check x-shopback-agent should have correct agent value'
      );
    }
  }
}

module.exports = MiddlewareProvider;
