/** @typedef {import('../../types').AssetType} AssetType */

/** @type {Record<AssetType,'ticker' | 'currency' >} */
export const symbolFieldName = {
  crypto: 'ticker',
  etf: 'ticker',
  stock: 'ticker',
  fiat: 'currency',
};

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @param {number} [limit]
 * @returns {{ query: string, params: any[] }}
 */
export const selectBySymbol = (schema, symbol, limit) => {
  const table = symbolFieldName[schema];

  let query = `
    SELECT * FROM "${schema}"."${table}"
    WHERE REPLACE(LOWER("symbol"), ' ', '') LIKE LOWER($1)
  `;

  const orderBy = table === 'currency' ? '"symbol"' : '"marketCap" DESC';
  query += `ORDER BY ${orderBy} `;

  /** @type {any[]} */
  const params = [`${symbol}%`];

  if (limit) {
    query += 'LIMIT $2';
    params.push(limit);
  }

  return { query, params };
};
