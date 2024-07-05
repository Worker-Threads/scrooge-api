import { create, selectOne, update, deleteOne } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  findOne: async (definition) => {
    const { query, params } = selectOne(definition);

    const {
      rows: [portfolio],
    } = await pool.query(query, params);

    return portfolio;
  },

  create: async (portfolio) => {
    const { query, params } = create(portfolio);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },

  update: async (id, portfolio) => {
    const { query, params } = update(id, portfolio);

    const {
      rows: [updatedPortfolio],
    } = await pool.query(query, params);

    return updatedPortfolio;
  },

  remove: async (id) => {
    const { query, params } = deleteOne(id);

    const { rowCount } = await pool.query(query, params);
    const removed = (rowCount ?? 0) > 0;

    return { removed };
  },
});
