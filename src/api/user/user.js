import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ userService }) => ({
  greet: {
    method: 'get',
    access: 'none',
    schema: schemas.greet,
    handler: (_session, request) => {
      const { name } = request.query;

      return `Hello ${name}!`;
    },
  },

  getById: {
    method: 'get',
    access: 'none',
    params: ['id'],
    schema: schemas.getById,
    handler: (_session, request) => {
      const { id } = request.params;

      return userService.findById(id);
    },
  },
});
