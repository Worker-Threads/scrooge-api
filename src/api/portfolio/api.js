import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ portfolioService }) => ({
  create: {
    method: 'post',
    access: 'common',
    schema: schemas.create,
    handler: (session, request) => {
      const { user } = session;
      const { type, title } = request.body;

      return portfolioService.create(user, { type, title });
    },
  },

  portfolio: {
    method: 'get',
    access: 'common',
    params: ['id'],
    schema: schemas.portfolio,
    handler: (session, request) => {
      const { user } = session;
      const { id } = request.params;

      return portfolioService.findOne(user, { id });
    },
  },

  update: {
    method: 'put',
    access: 'common',
    params: ['id'],
    schema: schemas.update,
    handler: (session, request) => {
      const { user } = session;
      const { id } = request.params;

      return portfolioService.update(user, { id, ...request.body });
    },
  },

  remove: {
    method: 'delete',
    access: 'common',
    params: ['id'],
    schema: schemas.remove,
    handler: (session, request) => {
      const { user } = session;
      const { id } = request.params;

      return portfolioService.remove(user, id);
    },
  },
});
