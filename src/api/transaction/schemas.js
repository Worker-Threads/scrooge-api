export const create = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat'],
        },
        portfolioId: {
          type: 'integer',
        },
        volume: {
          type: 'number',
        },
        timestamp: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        ticker: {
          type: 'string',
        },
        currency: {
          type: 'string',
        },
      },
      required: ['portfolioId', 'volume', 'timestamp', 'price', 'type'],
      oneOf: [{ required: ['ticker'] }, { required: ['currency'] }],
      additionalProperties: false,
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
          enum: ['crypto', 'etf', 'stock', 'fiat'],
        },
        volume: {
          type: 'number',
        },
        timestamp: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
      },
      required: ['type'],
      additionalProperties: false,
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

export const getForUser = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  required: ['headers'],
});

export const getByPortfolio = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        portfolioId: { type: 'integer' },
      },
      required: ['portfolioId'],
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
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat'],
        },
      },
      required: ['type'],
      additionalProperties: false,
    },
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  required: ['params', 'headers', 'body'],
});
