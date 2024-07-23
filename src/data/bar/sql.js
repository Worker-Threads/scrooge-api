/** @typedef {import('../../types').AssetType} AssetType */

import { symbolFieldName } from '../ticker/sql.js';

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @param {number} timestamp
 * @returns {{ query: string, params: any[] }}
 */
export const selectOhlc = (schema, symbol, timestamp) => {
  const symbolField = symbolFieldName[schema];

  const query = `
    SELECT * FROM ${schema}.bar_d
    WHERE "${symbolField}" = $1
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
  const symbolField = symbolFieldName[schema];

  const query = `
    WITH LAST_BARS AS (
      SELECT "${symbolField}", "close", "timestamp",
      ROW_NUMBER() OVER
      (PARTITION BY "${symbolField}" ORDER BY "timestamp" DESC) AS RN
      FROM ${schema}.BAR_D
    ),
    PREV_BARS AS(
      SELECT "${symbolField}", "close", "timestamp",
      LEAD("close") OVER
      (PARTITION BY "${symbolField}" ORDER BY "timestamp" DESC) as prev_close
      FROM ${schema}.BAR_D
    )
    SELECT LB."${symbolField}",
    PB.PREV_CLOSE AS "previousPrice",
    LB.CLOSE AS "currentPrice",
    (LB.CLOSE - PB.PREV_CLOSE) / PB.PREV_CLOSE * 100  AS "gain24h"
    FROM LAST_BARS LB
    JOIN PREV_BARS PB ON LB."${symbolField}" = PB."${symbolField}"
    AND LB.TIMESTAMP = PB.TIMESTAMP
    WHERE LB.RN = 1 AND LB."${symbolField}" IN (${symbols.map((s) => `'${s}'`).join(', ')});
  `;

  return { query, params: [] };
};

/**
 * @param {AssetType} schema
 * @param {string} symbol
 * @param {number} from
 * @param {number} to
 * @returns {{ query: string, params: any[] }}
 */
export const selectHistory = (schema, symbol, from, to) => {
  const symbolField = symbolFieldName[schema];

  const query = `
    SELECT * FROM ${schema}.BAR_D
    WHERE ${symbolField} = $1
    AND "timestamp" >= $2
    AND "timestamp" <= $3
    ORDER BY "timestamp";
  `;

  const params = [symbol, new Date(from), new Date(to)];

  return { query, params };
};
