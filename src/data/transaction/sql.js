/** @typedef {import('../../entities/transaction').GeneralTransaction} GeneralTransaction */
/** @typedef {import('../../types').AssetType} AssetType */

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
 * @param {Omit<GeneralTransaction, 'id'>} transaction
 * @returns {{ query: string, params: any[] }}
 */
export const create = (schema, transaction) => {
  const { portfolioId, volume, timestamp, ...specificFields } = transaction;
  const fields = [
    'portfolioId',
    'volume',
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
    volume,
    new Date(timestamp),
    ...Object.values(specificFields),
  ];

  return { query, params };
};

/**
 * @param {AssetType} schema
 * @param {number} id
 * @param {Partial<GeneralTransaction>} transaction
 * @returns {{ query: string, params: any[] }}
 */
export const update = (schema, id, transaction) => {
  const setClause = Object.keys(transaction)
    .map((key, i) => `"${key}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE "${schema}"."transaction"
    SET ${setClause}
    WHERE "id" = $${Object.keys(transaction).length + 1}
    RETURNING *;
  `;

  const params = [...Object.values(transaction), id];

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
