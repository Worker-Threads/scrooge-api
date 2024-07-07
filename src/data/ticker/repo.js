import { selectBySymbol } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  searchBySymbol: async (schema, symbol, limit) => {
    const { query, params } = selectBySymbol(schema, symbol, limit);
    const { rows } = await pool.query(query, params);

    return rows;
  },
});
