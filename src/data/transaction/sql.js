/** @typedef {import('../../entities/transaction').Transaction} Transaction */
/** @typedef {import('../../types').AssetType} AssetType */

import { resolveTableName } from '../ticker/sql.js';

/**
 * @param {AssetType} schema
 * @param {number} id
 * @returns {{ query: string, params: any[] }}
 */
export const selectById = (schema, id) => {
  const query = `
    SELECT * FROM "${schema}"."transaction"
    WHERE "id" = $1;
  `;

  const params = [id];

  return { query, params };
};

/**
 * @param {number} userId
 * @param {AssetType} schema
 * @param {number} [portfolioId]
 * @returns {{ query: string, params: any[] }}
 */
export const selectForUser = (userId, schema, portfolioId) => {
  const whereClause = portfolioId ? 'AND "portfolioId" = $2' : '';

  const query = `
    SELECT t.*
    FROM "${schema}"."transaction" t
    JOIN "user"."portfolio" p ON t."portfolioId" = p."id"
    WHERE p."userId" = $1 ${whereClause};
  `;

  const params = portfolioId ? [userId, portfolioId] : [userId];

  return { query, params };
};

/**
 * @param {AssetType} schema
 * @param {Omit<Transaction, 'id'>} transaction
 * @returns {{ query: string, params: any[] }}
 */
export const create = (schema, transaction) => {
  const { portfolioId, amount, timestamp, ...specificFields } = transaction;
  const fields = [
    'portfolioId',
    'amount',
    'timestamp',
    ...Object.keys(specificFields),
  ];

  const values = [
    '$1',
    '$2',
    '$3',
    ...Object.keys(specificFields).map((_, i) => `$${i + 4}`),
  ];

  const query = `
    INSERT INTO "${schema}"."transaction"
    (${fields.map((f) => `"${f}"`).join(', ')})
    VALUES(${values.join(', ')})
    RETURNING *;
  `;

  const params = [
    portfolioId,
    amount,
    new Date(timestamp),
    ...Object.values(specificFields),
  ];

  return { query, params };
};

/**
 * @param {AssetType} schema
 * @param {number} id
 * @param {Partial<Transaction>} transaction
 * @returns {{ query: string, params: any[] }}
 */
export const update = (schema, id, transaction) => {
  const setClause = [];
  /** @type {any[]} */
  const params = [id];

  if (transaction.amount) {
    params.push(transaction.amount);
    setClause.push(`"amount" = $${params.length}`);
  }

  if (transaction.timestamp) {
    params.push(new Date(transaction.timestamp));
    setClause.push(`"timestamp" = $${params.length}`);
  }

  if (transaction.price) {
    params.push(transaction.price);
    setClause.push(`"price" = $${params.length}`);
  }

  const query = `
    UPDATE "${schema}"."transaction"
    SET ${setClause.join(',')}
    WHERE "id" = $1
    RETURNING *;
  `;

  return { query, params };
};

/**
 * @param {AssetType} schema
 * @param {number} id
 * @returns {{ query: string, params: any[] }}
 */
export const remove = (schema, id) => {
  const query = `
    DELETE FROM "${schema}"."transaction"
    WHERE "id" = $1
    RETURNING *;
  `;

  const params = [id];

  return { query, params };
};

/**
 * @param {AssetType} schema
 * @param {number[]} portfolioIds
 * @returns {{ query: string, params: any[] }}
 */
export const selectAnalyzed = (schema, portfolioIds) => {
  const tcField = resolveTableName(schema);

  const initialValue = 'T.AMOUNT * T.PRICE';
  const growth = '(B.CLOSE - T.PRICE) / T.PRICE * 100'; // Percentage %
  const currentValue = `${initialValue} * (1 + ${growth} / 100)`;
  const profit = `${currentValue} - ${initialValue}`;

  const lastBarTimestamp = `
    SELECT MAX(BAR_INNER.TIMESTAMP)
    FROM ${schema}.BAR_D BAR_INNER
    WHERE BAR_INNER.${tcField} = T.${tcField}
  `;

  const query = `
    SELECT
      T.*,
      B.CLOSE AS "currentPrice",
      ${initialValue} as "initialValue",
      ${currentValue} AS "currentValue",
      ${growth} AS "growth",
      ${profit} AS "profit"
    FROM ${schema}.TRANSACTION T
    JOIN ${schema}.BAR_D B ON T.${tcField} = B.${tcField}
    WHERE T."portfolioId" IN (${portfolioIds.join(',')})
    AND B.TIMESTAMP = (${lastBarTimestamp});
  `;

  return { query, params: [] };
};
