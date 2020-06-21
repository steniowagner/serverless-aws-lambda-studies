const uuid = require("uuid");

const makeBook = (data) => ({
  ...data,
  createdAt: new Date().toISOString(),
  id: uuid.v1(),
});

module.exports = makeBook;
