'use strict';

var expect = require('chai').expect;
var errorsUtils = require('../lib/utils/errors/');

describe('ValidationError', () => {
  let validationError = Object,
    exceptionError = Error,
    message = '';

  beforeEach(() => {
    try {
      validationError = new errorsUtils.ValidationError(message);
    } catch (e) {
      exceptionError = e;
    }
  });

  afterEach(() => {
    validationError = Object;
    message = '';
    exceptionError = Error;
  });

  describe('new()', () => {
    before(() => {
      message = 'error occurs';
    });
    it('should return error', () => {
      expect(exceptionError.message).to.be.undefined;
      expect(validationError.message).equal(message);
    });
  });
  describe('toJSON()', () => {
    var errorJSON = Object;
    before(() => {
      message = 'error occurs';
    });
    beforeEach(() => {
      errorJSON = validationError.toJSON().error;
    });
    it('returns error info', () => {
      expect(exceptionError.message).to.be.undefined;
      expect(errorJSON.name).equal('ValidationError');
      expect(errorJSON.message).equal('error occurs');
    });
  });
});

describe('BadRequestError', () => {
  let badRequestError = Object,
    exceptionError = Error,
    message = '';
  beforeEach(() => {
    try {
      badRequestError = new errorsUtils.BadRequestError(message);
    } catch (e) {
      badRequestError = e;
    }
  });

  afterEach(() => {
    badRequestError = Object;
    message = '';
    exceptionError = Error;
  });

  describe('new()', () => {
    before(() => {
      message = 'error occurs';
    });
    it('should return error', () => {
      expect(exceptionError.message).to.be.undefined;
      expect(badRequestError.message).equal(message);
    });
  });
  describe('toJSON()', () => {
    var errorJSON = Object;
    before(() => {
      message = 'error occurs';
    });
    beforeEach(() => {
      errorJSON = badRequestError.toJSON().error;
    });
    it('returns error info', () => {
      expect(exceptionError.message).to.be.undefined;
      expect(errorJSON.name).equal('BadRequestError');
      expect(errorJSON.message).equal('error occurs');
    });
  });
});
