/** @typedef {import('../../types').AssetType} AssetType */

import {
  create,
  selectById,
  selectForUser,
  update,
  remove,
  selectTickers,
  selectAnalyzed,
} from './sql.js';
import { pgToAnalyzedRow } from './transform.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  create: async (schema, transaction) => {
    const { query, params } = create(schema, transaction);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },

  update: async (schema, id, transaction) => {
    const { query, params } = update(schema, id, transaction);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },

  findById: async (schema, id) => {
    const { query, params } = selectById(schema, id);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },

  findForUser: async (schema, userId, portfolioId) => {
    const { query, params } = selectForUser(userId, schema, portfolioId);
    const { rows } = await pool.query(query, params);

    return rows;
  },

  remove: async (schema, id) => {
    const { query, params } = remove(schema, id);
    const { rowCount } = await pool.query(query, params);
    const removed = (rowCount ?? 0) > 0;

    return { removed };
  },

  getPortfolioTickers: async (portfolioId) => {
    const result = /** @type {Record<AssetType, string[]>} */ ({});
    /** @type {AssetType[]} */
    const assetTypes = ['crypto', 'etf', 'stock', 'fiat'];
    await Promise.all(
      assetTypes.map(async (t) => {
        const { query, params } = selectTickers(t, portfolioId);
        const { rows } = await pool.query(query, params);
        const tickers = rows.map((t) => t.ticker ?? t.currency);

        result[t] = tickers;
      }),
    );

    return result;
  },

  getAnalyzedForTicker: async (portfolioId, schema, symbol) => {
    const { query, params } = selectAnalyzed([portfolioId], schema, symbol);
    const { rows } = await pool.query(query, params);

    return rows.map((row) => pgToAnalyzedRow(row, schema));
  },

  getAnalyzedTransactions: async (portfolioIds) => {
    /** @type {AssetType[]} */
    const assetTypes = ['crypto', 'etf', 'stock', 'fiat'];

    const rowsArray = await Promise.all(
      assetTypes.map((t) => {
        const { query, params } = selectAnalyzed(portfolioIds, t);

        return pool.query(query, params);
      }),
    );

    const transactions = rowsArray.flatMap(({ rows }, index) => {
      const type = assetTypes[index];
      return rows.map((row) => pgToAnalyzedRow(row, type));
    });

    return transactions;
  },
});
