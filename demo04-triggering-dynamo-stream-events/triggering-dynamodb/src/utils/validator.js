const validator = (next, schema, argType) =>
  async function (event) {
    const data = JSON.parse(event[argType]);

    const { error, value } = await schema.validate(data, { abortEarly: true });

    if (error) {
      return {
        statusCode: 422,
        body: error.message,
      };
    }

    event[argType] = value;

    return next.apply(this, arguments);
  };

module.exports = validator;
