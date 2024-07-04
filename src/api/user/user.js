import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ userService }) => ({
  user: {
    method: 'get',
    access: 'none',
    params: ['id'],
    schema: schemas.user,
    handler: (_session, request) => {
      const { id } = request.params;

      return userService.findById(id);
    },
  },
});
