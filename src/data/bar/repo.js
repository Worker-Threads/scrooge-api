import { selectOhlc } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  getOhlc: async (schema, ticker, timestamp) => {
    const { query, params } = selectOhlc(schema, ticker, timestamp);

    const {
      rows: [ohlc],
    } = await pool.query(query, params);

    return ohlc
      ? {
          open: +ohlc.open,
          high: +ohlc.high,
          low: +ohlc.low,
          close: +ohlc.close,
          timestamp: new Date(ohlc.timestamp).getTime(),
        }
      : null;
  },
});
