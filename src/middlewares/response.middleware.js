// middleware/responseMiddleware.js

module.exports = (req, res, next) => {
  res.customResponse = (statusCode, statusText, data = null, message = "") => {
    const response = {
      message,
      STATUS_CODE: statusCode,
      STATUS_TEXT: statusText,
    };

    if (data !== null) response.data = data;

    return res.status(statusCode).json(response);
  };
  next();
};
