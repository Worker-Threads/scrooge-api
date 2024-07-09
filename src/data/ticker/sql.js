/**
 * @typedef {import('../../entities/transaction').GeneralTransaction} GeneralTransaction
 * @typedef {import('../../types').AssetType} AssetType
 */

/**
 * @param {AssetType} schema
 * @returns {'ticker' | 'currency' | null}
 */
export const resolveTableName = (schema) => {
  const tickerSchemas = ['crypto', 'etf', 'stock'];
  const currencySchemas = ['fiat'];

  return tickerSchemas.includes(schema)
    ? 'ticker'
    : currencySchemas.includes(schema)
      ? 'currency'
      : null;
};

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @param {number} [limit]
 * @returns {{ query: string, params: any[] }}
 */
export const selectBySymbol = (schema, symbol, limit) => {
  const table = resolveTableName(schema);

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
