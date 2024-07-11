/** @typedef {import('../../types').AssetType} AssetType */

import { selectOhlc, select24hChange } from './sql.js';

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

  get24hChange: async (tickers) => {
    /** @type {AssetType[]} */
    const assetTypes = ['crypto', 'etf', 'stock', 'fiat'];

    const rowsArray = await Promise.all(
      assetTypes.map((t) => {
        const { query, params } = select24hChange(t, tickers);

        return pool.query(query, params);
      }),
    );

    const transactions = rowsArray.flatMap(({ rows }, index) => {
      const type = assetTypes[index];
      return rows.map((row) => ({
        type,
        ticker: row.ticker ?? row.currency,
        previousPrice: +row.previousPrice,
        currentPrice: +row.currentPrice,
        gain24h: +row.gain24h,
      }));
    });

    return transactions;
  },
});
