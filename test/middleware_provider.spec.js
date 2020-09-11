'use strict';
const chai = require('chai'),
  spies = require('chai-spies');
chai.use(spies);
const should = chai.should(),
  expect = chai.expect;

const SecurityChecker = require('..');

describe('MiddlewareProvider', () => {
  let middlewareProvider = SecurityChecker.MiddlewareProvider;

  describe('new()', () => {
    let options = Object,
      error = Error;
    beforeEach(() => {
      try {
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      middlewareProvider = Object;
      error = Error;
      options = Object;
    });

    describe('when input valid params', () => {
      it('should successfully new a SecurityChecker without error', () => {
        expect(error.message).to.be.undefined;
      });
    });
  });

  describe('redirectToAssetsMiddleware()', () => {
    let req = Object,
      resp = Object,
      error = Error,
      next = () => {};

    beforeEach(() => {
      try {
        next = chai.spy();
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
        middlewareProvider.redirectToAssetsMiddleware(req, resp, next);
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      middlewareProvider = Object;
      error = Error;
      next = () => {};
    });

    describe('when request path with params matched the config', () => {
      before(() => {
        req = { path: '/shopback/resource?sort=desc', method: 'GET' };
      });
      it('should replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/static/assets?sort=desc');
        next.should.have.been.called.once;
      });
    });

    describe('when request close path with params matched the config', () => {
      before(() => {
        req = { path: '/shopback/resource/?sort=desc', method: 'GET' };
      });
      it('should replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/static/assets/?sort=desc');
        next.should.have.been.called.once;
      });
    });

    describe('when request path with params partially matched the config', () => {
      before(() => {
        req = { path: '/shopback/resource/products/?sort=desc', method: 'GET' };
      });
      it('should replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/static/assets/products/?sort=desc');
        next.should.have.been.called.once;
      });
    });

    describe('when request is not a GET method', () => {
      before(() => {
        req = {
          path: '/shopback/resource/products/?sort=desc',
          method: 'POST',
        };
      });
      it('should not replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/resource/products/?sort=desc');
        next.should.have.been.called.once;
      });
    });

    describe('when request path is not match in the beginning', () => {
      before(() => {
        req = {
          path: '/additional-path/shopback/resource/products/?sort=desc',
          method: 'GET',
        };
      });
      it('should not replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal(
          '/additional-path/shopback/resource/products/?sort=desc'
        );
        next.should.have.been.called.once;
      });
    });
  });

  describe('cookieMatcherMiddleware()', () => {
    let req = Object,
      resp = Object,
      error = Error,
      next = () => {};

    beforeEach(() => {
      try {
        next = chai.spy();
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
        middlewareProvider.cookieMatcherMiddleware(req, resp, next);
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      middlewareProvider = Object;
      error = Error;
      next = () => {};
    });
    describe('when path matched and cookie header', () => {
      before(() => {
        req = {
          path: '/shopback/me',
          method: 'GET',
          cookies: {
            authentication: '95567eda10aa4f64b48bf49e1139a766',
          },
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        next.should.have.been.called.once;
      });
    });

    describe('when cookies is not contains', () => {
      before(() => {
        req = {
          path: '/shopback/me',
          method: 'GET',
          cookies: {},
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });

    describe('when given incorrect path', () => {
      before(() => {
        req = {
          path: '/shopback/notfound',
          method: 'GET',
          cookies: {
            authentication: '95567eda10aa4f64b48bf49e1139a766',
          },
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });

    describe('when given incorrect method', () => {
      before(() => {
        req = {
          path: '/shopback/me',
          method: 'POST',
          cookies: {
            authentication: '95567eda10aa4f64b48bf49e1139a766',
          },
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });
  });

  describe('domainNameCheckerMiddleware()', () => {
    let req = Object,
      resp = Object,
      error = Error,
      next = () => {};

    beforeEach(() => {
      try {
        next = chai.spy();
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
        middlewareProvider.domainNameCheckerMiddleware(req, resp, next);
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      middlewareProvider = Object;
      error = Error;
      next = () => {};
    });

    describe('when domain name and method matched', () => {
      before(() => {
        req = {
          get: (name) => {
            return { host: 'www.shopback.com' }[name];
          },
          method: 'GET',
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        next.should.have.been.called.once;
      });
    });

    describe('when method not match', () => {
      before(() => {
        req = {
          get: (name) => {
            return { host: 'www.shopback.com' }[name];
          },
          method: 'POST',
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });

    describe('when path not match', () => {
      before(() => {
        req = {
          get: (name) => {
            return { host: 'www.shopback.hk' }[name];
          },
          method: 'GET',
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });
  });

  describe('redirectToEmailLinkMiddleware()', () => {
    let req = Object,
      resp = Object,
      error = Error,
      next = () => {};

    beforeEach(() => {
      try {
        next = chai.spy();
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
        middlewareProvider.addFromMiddleware(req, resp, next);
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      middlewareProvider = Object;
      error = Error;
      next = () => {};
    });

    describe('when path and method matched', () => {
      before(() => {
        req = {
          path: '/shopback/api/any_path',
          method: 'GET',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        expect(resp.From).to.be.equal('hello@shopback.com');
        next.should.have.been.called.once;
      });
    });
    describe('when path is incorrect', () => {
      before(() => {
        req = {
          path: '/shopback/not_found/any_path',
          method: 'GET',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });
    describe('when method is incorrect', () => {
      before(() => {
        req = {
          path: '/shopback/api/any_path',
          method: 'POST',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should throw error', () => {
        expect(error.name).equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });
  });

  describe('trimQueryStringMiddleware()', () => {
    let req = Object,
      resp = Object,
      error = Error,
      next = () => {};

    beforeEach(() => {
      try {
        next = chai.spy();
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
        middlewareProvider.trimQueryStringMiddleware(req, resp, next);
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      middlewareProvider = Object;
      error = Error;
      next = () => {};
    });
    describe('when PUT method matched', () => {
      before(() => {
        req = {
          path: '/shopback/api/any_path?hello=world',
          method: 'PUT',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).to.be.equal('/shopback/api/any_path');
        next.should.have.been.called.once;
      });
    });

    describe('when POST method matched', () => {
      before(() => {
        req = {
          path: '/shopback/api/any_path?hello=world',
          method: 'POST',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).to.be.equal('/shopback/api/any_path');
        next.should.have.been.called.once;
      });
    });

    describe('when method is not matched', () => {
      before(() => {
        req = {
          path: '/shopback/api/any_path?hello=world',
          method: 'GET',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should pass and nothing changed', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).to.be.equal('/shopback/api/any_path?hello=world');
        next.should.have.been.called.once;
      });
    });

    describe('when path does not match any', () => {
      before(() => {
        req = {
          path: '/shopback/api/any_path',
          method: 'PUT',
        };
        resp = {
          set: (key, value) => {
            resp[key] = value;
          },
        };
      });
      it('should pass and nothing changed', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).to.be.equal('/shopback/api/any_path');
        next.should.have.been.called.once;
      });
    });
  });

  describe('checkShopBackAgentMiddleware()', () => {
    let req = Object,
      resp = Object,
      error = Error,
      next = () => {};

    beforeEach(() => {
      try {
        next = chai.spy();
        middlewareProvider = new SecurityChecker.MiddlewareProvider();
        middlewareProvider.checkShopBackAgentMiddleware(req, resp, next);
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      middlewareProvider = Object;
      error = Error;
      next = () => {};
    });
    describe('when PUT method matched', () => {
      before(() => {
        req = {
          headers: { 'X-SHOPBACK-AGENT': 'bcd1c25e10994db9a1c7ac90756058b7' },
          method: 'PUT',
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        next.should.have.been.called.once;
      });
    });

    describe('when POST method matched', () => {
      before(() => {
        req = {
          headers: { 'X-SHOPBACK-AGENT': 'bcd1c25e10994db9a1c7ac90756058b7' },
          method: 'POST',
        };
      });
      it('should pass', () => {
        expect(error.message).to.be.undefined;
        next.should.have.been.called.once;
      });
    });

    describe('when given incorrect method', () => {
      before(() => {
        req = {
          headers: { 'X-SHOPBACK-AGENT': 'bcd1c25e10994db9a1c7ac90756058b7' },
          method: 'GET',
        };
      });
      it('should throw errors', () => {
        expect(error.name).to.be.equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });

    describe('when given req without headers', () => {
      before(() => {
        req = {
          method: 'PUT',
        };
      });
      it('should throw error', () => {
        expect(error.name).to.be.equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });

    describe('when given req without X-SHOPBACK-AGENT', () => {
      before(() => {
        req = {
          headers: {},
          method: 'PUT',
        };
      });
      it('should throw error', () => {
        expect(error.name).to.be.equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });

    describe('when given req header X-SHOPBACK-AGENT is undefined', () => {
      before(() => {
        req = {
          headers: {
            'X-SHOPBACK-AGENT': undefined,
          },
          method: 'PUT',
        };
      });
      it('should throw error', () => {
        expect(error.name).to.be.equal('BadRequestError');
        next.should.not.have.been.called;
      });
    });
  });
});
