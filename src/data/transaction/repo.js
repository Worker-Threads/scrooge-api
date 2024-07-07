import { create, selectById, selectForUser, update, remove } from './sql.js';

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
});
