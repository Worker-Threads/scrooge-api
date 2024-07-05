/** @typedef {import('../../entities/portfolio').Portfolio} Portfolio */

/**
 * @param {Omit<Portfolio, 'id'>} definition
 * @returns {{ query: string, params: any[] }}
 */
export const create = (definition) => {
  const query = `
    INSERT INTO "user"."portfolio"
    ("userId", "type", "title")
    VALUES($1, $2, $3)
    RETURNING *;
  `;

  const params = [definition.userId, definition.type, definition.title];

  return { query, params };
};

/**
 * @param {Partial<Portfolio>} definition
 * @returns {{ query: string, params: any[] }}
 */
export const selectOne = (definition) => {
  const select = 'SELECT * from "user"."portfolio"';
  const where =
    ' WHERE ' +
    Object.keys(definition)
      .map((k, i) => `"${k}" = $${i + 1}`)
      .join(' AND ');

  const query = select + where + ';';

  const params = Object.values(definition);

  return { query, params };
};

/**
 * @param {number} id
 * @param {Partial<Portfolio>} definition
 * @returns {{ query: string, params: any[] }}
 */
export const update = (id, definition) => {
  const setClause =
    ' SET ' +
    Object.keys(definition)
      .map((k, i) => `"${k}" = $${i + 1}`)
      .join(', ');

  const query = `
    UPDATE "user"."portfolio"
    ${setClause}
    WHERE "id" = $${Object.keys(definition).length + 1}
    RETURNING *;
  `;

  const params = [...Object.values(definition), id];

  return { query, params };
};

/**
 * @param {number} id
 * @returns {{ query: string, params: any[] }}
 */
export const deleteOne = (id) => {
  const query = `
    DELETE FROM "user"."portfolio"
    WHERE "id" = $1;
  `;

  const params = [id];

  return { query, params };
};
