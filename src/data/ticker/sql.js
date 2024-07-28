/** @typedef {import('../../types').AssetType} AssetType */

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @param {number} [limit]
 * @returns {{ query: string, params: any[] }}
 */
export const selectBySymbol = (schema, symbol, limit) => {
  let query = `
    SELECT * FROM "${schema}"."ticker"
    WHERE REPLACE(LOWER("symbol"), ' ', '') LIKE LOWER($1)
  `;

  const orderBy = schema === 'fiat' ? '"symbol"' : '"marketCap" DESC';
  query += `ORDER BY ${orderBy} `;

  /** @type {any[]} */
  const params = [`${symbol}%`];

  if (limit) {
    query += 'LIMIT $2';
    params.push(limit);
  }

  return { query, params };
};
