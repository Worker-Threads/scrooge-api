/** @typedef {import('../../types').AssetType} AssetType */

import {
  create,
  selectById,
  selectForUser,
  update,
  remove,
  selectAnalyzed,
} from './sql.js';

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

  getAnalyzedTransactions: async (portfolioIds) => {
    /** @type {AssetType[]} */
    const assetTypes = ['crypto', 'etf', 'stock', 'fiat'];

    const rowsArray = await Promise.all(
      assetTypes.map((t) => {
        const { query, params } = selectAnalyzed(t, portfolioIds);

        return pool.query(query, params);
      }),
    );

    const transactions = rowsArray.flatMap(({ rows }, index) => {
      const type = assetTypes[index];
      return rows.map((row) => ({
        ...row,
        type,
        ticker: row.ticker ?? row.currency,
        amount: +row.amount,
        initialValue: +row.initialValue,
        currentValue: +row.currentValue,
        entryPrice: +row.price,
        currentPrice: +row.currentPrice,
        growth: +row.growth,
        profit: +row.profit,
        timestamp: new Date(row.timestamp).getTime(),
      }));
    });

    return transactions;
  },
});
