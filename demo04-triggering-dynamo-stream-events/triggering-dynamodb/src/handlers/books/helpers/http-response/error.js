const error = ({ statusCode, message }) => ({
  headers: { "Context-Type": "text/plain" },
  body: message || "Internal server error",
  statusCode: statusCode || 501,
});

module.exports = error;
