// middleware/responseMiddleware.js

module.exports = (req, res, next) => {
  res.customResponse = (statusCode, statusText, data, message) => {
    return res.status(statusCode).json({
      message: message,
      data: data || null,
      STATUS_CODE: statusCode,
      STATUS_TEXT: statusText,
    });
  };
  next();
};
