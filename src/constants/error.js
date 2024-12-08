const errorCodes = {
  // Auth-related errors
  AUTH_INVALID_EMAIL: {
    code: "ERR-001",
    message: "Invalid email",
  },
  AUTH_INVALID_CREDENTIALS: {
    code: "ERR-002",
    message: "Invalid login credentials",
  },

  // Generic errors
  INVALID_REQUEST: {
    code: "ERR-400",
    message: "Invalid request",
  },
  // Add other error codes and messages as needed
};

module.exports = errorCodes;
