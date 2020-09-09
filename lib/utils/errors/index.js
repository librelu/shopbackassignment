'use strict';

const ErrorUtils = {};
ErrorUtils.ValidationError = require('./validation_error');
ErrorUtils.BadRequestError = require('./bad_request_error');

module.exports = ErrorUtils;
