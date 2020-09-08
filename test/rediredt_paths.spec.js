'use strict';

const expect = require('chai').expect;
const SecurityChecker = require('..');

describe('RedirectPathMiddleware', () => {
  let redirectPathMiddleware = SecurityChecker.RedirectPathMiddleware;
  let error = Error;
  let options = Object;

  describe('new()', () => {
    beforeEach(() => {
      try {
        redirectPathMiddleware = new SecurityChecker.RedirectPathMiddleware(
          options
        );
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      redirectPathMiddleware = Object;
      error = Error;
      options = Object;
    });

    describe('when input valid params', () => {
      before(() => {
        options = {
          paths: ['example/path'],
        };
      });
      it('should successfully new a SecurityChecker without error', () => {
        expect(error.message).to.be.undefined;
      });
    });

    describe('when given blank paths', () => {
      before(() => {
        options = {};
      });
      it('should occur error exception', () => {
        expect(error.name).equal('ValidationError');
      });
    });

    describe('when given paths is not array', () => {
      before(() => {
        options = {
          paths: 'example.com',
        };
      });
      it('should occur error exception', () => {
        expect(error.name).equal('ValidationError');
      });
    });
  });

  describe('paths()', () => {
    beforeEach(() => {
      try {
        redirectPathMiddleware = new SecurityChecker.RedirectPathMiddleware({
          paths: ['example/path'],
        });
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      redirectPathMiddleware = Object;
      error = Error;
      options = Object;
    });

    it('should returns paths', () => {
      expect(error.message).to.be.undefined;
      expect(redirectPathMiddleware.paths.length).equal(1);
      expect(redirectPathMiddleware.paths[0]).to.have.equal('example/path');
    });
  });

  describe('middleware()', () => {
    let req = Object,
      resp = Object;

    beforeEach(() => {
      try {
        redirectPathMiddleware = new SecurityChecker.RedirectPathMiddleware({
          paths: ['/shopback/resource'],
        });
        redirectPathMiddleware.redirectToAssetsMiddleware(req, resp, () => {});
      } catch (e) {
        error = e;
      }
    });

    afterEach(() => {
      // reset params
      req = Object;
      resp = Object;
      redirectPathMiddleware = Object;
      error = Error;
      options = Object;
    });

    describe('when request path with params matched the config', () => {
      before(() => {
        req = { path: '/shopback/resource?sort=desc' };
      });
      it('should replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/static/assets?sort=desc');
      });
    });

    describe('when request close path with params matched the config', () => {
      before(() => {
        req = { path: '/shopback/resource/?sort=desc' };
      });
      it('should replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/static/assets/?sort=desc');
      });
    });

    describe('when request path with params partially matched the config', () => {
      before(() => {
        req = { path: '/shopback/resource/products/?sort=desc' };
      });
      it('should replace the path', () => {
        expect(error.message).to.be.undefined;
        expect(req.path).equal('/shopback/static/assets/products/?sort=desc');
      });
    });
  });
});
