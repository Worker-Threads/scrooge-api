export const signIn = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
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
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
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
