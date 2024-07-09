import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ barService }) => ({
  ohlc: {
    method: 'get',
    access: 'common',
    params: ['type'],
    schema: schemas.ohlc,
    handler: async (session, request) => {
      const { type } = request.params;
      const { ticker, timestamp } = request.query;

      return barService.getOhlc(type, ticker, timestamp);
    },
  },
});
