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

/**
 * @param {AssetType} schema
 * @param {string[]} symbols
 * @returns {{ query: string, params: any[] }}
 */
export const select24hChange = (schema, symbols) => {
  const table = resolveTableName(schema);

  const query = `
    WITH LAST_BARS AS (
      SELECT "${table}", "close", "timestamp",
      ROW_NUMBER() OVER
      (PARTITION BY "${table}" ORDER BY "timestamp" DESC) AS RN
      FROM ${schema}.BAR_D
    ),
    PREV_BARS AS(
      SELECT "${table}", "close", "timestamp",
      LEAD("close") OVER
      (PARTITION BY "${table}" ORDER BY "timestamp" DESC) as prev_close
      FROM ${schema}.BAR_D
    )
    SELECT LB."${table}",
    PB.PREV_CLOSE AS "previousPrice",
    LB.CLOSE AS "currentPrice",
    (LB.CLOSE - PB.PREV_CLOSE) / PB.PREV_CLOSE * 100  AS "gain24h"
    FROM LAST_BARS LB
    JOIN PREV_BARS PB ON LB."${table}" = PB."${table}"
    AND LB.TIMESTAMP = PB.TIMESTAMP
    WHERE LB.RN = 1 AND LB."${table}" IN (${symbols.map((s) => `'${s}'`).join(', ')});
  `;

  return { query, params: [] };
};
