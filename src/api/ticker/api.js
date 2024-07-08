import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ tickerService }) => ({
  tickers: {
    method: 'get',
    access: 'common',
    params: ['type'],
    schema: schemas.tickers,
    handler: async (session, request) => {
      const { type } = request.params;
      const { keyword, limit } = request.query;

      const internal = await tickerService.list(type, keyword, limit);

      if (internal.length)
        return internal.map((i) => ({ ...i, internal: true }));

      const external = await tickerService.externalList(type, keyword, limit);

      return external.map((i) => ({ ...i, internal: false }));
    },
  },
});
