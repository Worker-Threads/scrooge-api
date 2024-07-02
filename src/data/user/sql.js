/**
 * @param {number} id
 * @returns {{ query: string, params: any[] }}
 */
export const selectById = (id) => {
  const query = `
    SELECT * from "user"."user"
    WHERE "user".id = $1;
  `;

  const params = [id];

  return { query, params };
};
