export const signIn = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
      },
      required: ['email', 'password'],
    },
  },
  required: ['body'],
});

export const signUp = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        username: { type: 'string', minLength: 8 },
        password: { type: 'string', minLength: 6 },
      },
      required: ['email', 'username', 'password'],
    },
  },
  required: ['body'],
});

export const verify = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: {
      type: 'object',
      properties: {
        authorization: {
          type: 'string',
        },
      },
      required: ['authorization'],
    },
  },
  required: ['headers'],
});
