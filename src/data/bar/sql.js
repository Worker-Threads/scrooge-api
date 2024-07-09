/** @typedef {import('../../types').AssetType} AssetType */

import { resolveTableName } from '../ticker/sql.js';

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @param {number} timestamp
 * @returns {{ query: string, params: any[] }}
 */
export const selectOhlc = (schema, symbol, timestamp) => {
  const table = resolveTableName(schema);

  const query = `
    SELECT * FROM ${schema}.bar_d
    WHERE "${table}" = $1
    AND timestamp = $2;
  `;

  const params = [symbol, new Date(timestamp)];

  return { query, params };
};
