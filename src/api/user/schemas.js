export const user = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
  },
  required: ['params'],
});

export const me = /** @type {const} */ ({
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
