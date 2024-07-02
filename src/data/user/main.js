import { selectById } from './sql.js';

/** @type {import('./types').init} */
export const init = (pool) => ({
  findById: async (id) => {
    const { query, params } = selectById(id);

    const {
      rows: [user],
    } = await pool.query(query, params);

    return user;
  },
});
