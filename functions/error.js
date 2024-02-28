// @ts-check

const { UNHANDLED_ERR_CODE, NOT_FOUND_ERR_CODE, NOT_FOUND_ERR_MESSAGE } = require('../constant');

const buildError = ({ error, message }) => {
  const err = new Error(message || NOT_FOUND_ERR_CODE);
  err.error = error || UNHANDLED_ERR_CODE;

  return err;
};

exports.HttpError = (error, message) => {
  if (error.hasOwnProperty('error')) {
    return buildError(error);
  }

  let msg = message || NOT_FOUND_ERR_MESSAGE;

  if (typeof message === typeof {}) {
    const key = Object.keys(message)[0];
    msg = message[key].message;
  }

  return buildError({ error, message: msg });
};

exports.parseError = (e) => ({
  error: e.error || NOT_FOUND_ERR_CODE,
  message: e.message || NOT_FOUND_ERR_MESSAGE,
});
