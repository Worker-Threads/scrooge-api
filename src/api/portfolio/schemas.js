export const create = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat', 'mixed'],
        },
        title: { type: 'string', minLength: 1, maxLength: 255 },
      },
      required: ['type', 'title'],
    },
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  required: ['body', 'headers'],
});

export const portfolio = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  required: ['params', 'headers'],
});

export const update = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat', 'mixed'],
        },
        title: { type: 'string', maxLength: 255 },
      },
    },
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  required: ['params', 'body', 'headers'],
});

export const remove = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  required: ['params', 'headers'],
});
