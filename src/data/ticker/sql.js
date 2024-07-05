/** @typedef {import('../../entities/transaction').GeneralTransaction} GeneralTransaction */
/** @typedef {import('../../types').AssetType} AssetType */

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @returns {{ query: string, params: any[] }}
 */
export const selectBySymbol = (schema, symbol) => {
  const tickerSchemas = ['crypto', 'etf', 'stock'];
  const currencySchemas = ['fiat'];

  const table = tickerSchemas.includes(schema)
    ? 'ticker'
    : currencySchemas.includes(schema)
      ? 'currency'
      : null;

  const query = `
    SELECT * FROM "${schema}"."${table}"
    WHERE "symbol" = $1;
  `;

  const params = [symbol];

  return { query, params };
};
