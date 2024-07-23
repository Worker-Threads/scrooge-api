/** @typedef {import('../../types').AssetType} AssetType */

import { selectOhlc, select24hChange, selectHistory } from './sql.js';
import { getDatesInRange } from './time.js';

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

  getHistory: async (schema, ticker, from, to = Date.now()) => {
    const { query, params } = selectHistory(schema, ticker, from, to);
    const { rows } = await pool.query(query, params);

    return rows.map((r) => ({
      ...r,
      timestamp: new Date(r.timestamp).getTime(),
    }));
  },

  async getFilledHistory(schema, ticker, from, to = Date.now()) {
    const history = await this.getHistory(schema, ticker, from, to);
    const timeRange = getDatesInRange(from, to);

    let prevBar = { open: 0, high: 0, low: 0, close: 0 };
    const result = [];

    for (let i = 0, j = 0; i < timeRange.length; i += 1) {
      const bar = history[j];
      const time = new Date(timeRange[i]).getTime();
      const barTime = new Date(bar?.timestamp).getTime();

      if (time === barTime) {
        prevBar = bar;
        result.push(bar);
        j += 1;
      } else {
        result.push({ ...prevBar, timestamp: time });
      }
    }

    return result;
  },
});
