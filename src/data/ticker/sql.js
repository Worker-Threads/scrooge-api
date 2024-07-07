/** @typedef {import('../../entities/transaction').GeneralTransaction} GeneralTransaction */
/** @typedef {import('../../types').AssetType} AssetType */

/**
 * @param {AssetType} schema
 * @returns {string | null}
 */
const resolveTableName = (schema) => {
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
 * @returns {{ query: string }}
 */
export const getList = (schema) => {
  const table = resolveTableName(schema);
  const query = `SELECT * FROM "${schema}"."${table}";`;

  return { query };
};

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @returns {{ query: string, params: any[] }}
 */
export const selectBySymbol = (schema, symbol) => {
  const table = resolveTableName(schema);

  const query = `
    SELECT * FROM "${schema}"."${table}"
    WHERE "symbol" = $1;
  `;

  const params = [symbol];

  return { query, params };
};
