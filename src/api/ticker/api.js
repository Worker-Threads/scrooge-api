import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ tickerService }) => ({
  tickers: {
    method: 'get',
    access: 'common',
    params: ['type'],
    schema: schemas.tickers,
    handler: (session, request) => {
      const { type } = request.params;

      return tickerService.list(type);
    },
  },
});
