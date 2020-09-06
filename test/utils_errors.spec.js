var expect = require('chai').expect;
var errorsUtils = require('../lib/utils/errors/');

describe('ValidationError', () => {
  var validationError = Object;
  var message = '';
  beforeEach(() => {
    try {
      validationError = new errorsUtils.ValidationError(message);
    } catch (e) {
      validationError = e;
    }
  });
  describe('new()', () => {
    before(() => {
      message = 'error occurs';
    });
    it('should return error', () => {
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
      expect(errorJSON.name).equal('ValidationError');
      expect(errorJSON.message).equal('error occurs');
    });
  });
});
