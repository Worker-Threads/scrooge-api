export const greet = /** @type {const} */ ({
  type: 'object',
  properties: {
    query: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
  },
  required: ['query'],
});

export const getById = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
  },
  required: ['params'],
});
