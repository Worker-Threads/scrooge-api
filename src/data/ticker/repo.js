import { getList, selectBySymbol } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  list: async (schema) => {
    const { query } = getList(schema);

    const { rows } = await pool.query(query);

    return rows;
  },

  getBySymbol: async (schema, symbol) => {
    const { query, params } = selectBySymbol(schema, symbol);

    const { rows } = await pool.query(query, params);

    return rows;
  },
});
