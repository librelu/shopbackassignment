'use strict';

var expect = require('chai').expect;
var SecurityChecker = require('..');

describe('RedirectPathMiddleware', () => {
  var redirectPathMiddleware = Object;
  var error = Error;
  var options = {};
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
  });
  describe('paths()', () => {
    before(() => {
      options = {
        paths: ['example/path'],
      };
    });
    it('should returns paths', () => {
      expect(redirectPathMiddleware.paths.length).equal(1);
      expect(redirectPathMiddleware.paths[0]).to.have.equal('example/path');
    });
  });
  describe('redirectPath()', () => {
    it('should replace the path result', () => {});
  });
});
