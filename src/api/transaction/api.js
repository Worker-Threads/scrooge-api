import * as schemas from './schemas.js';

/** @type {import('./types.js').init} */
export const init = ({ transactionService }) => ({
  create: {
    method: 'post',
    access: 'common',
    schema: schemas.create,
    handler: (session, request) => {
      const { user } = session;
      const { type, ...rest } = request.body;

      return transactionService.create(type, user, rest);
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
      const { type, ...rest } = request.body;

      return transactionService.update(type, user, { id, ...rest });
    },
  },

  transactions: {
    method: 'get',
    access: 'common',
    schema: schemas.getForUser,
    handler: (session, request) => {
      const { user } = session;

      return transactionService.findForUser(user);
    },
  },

  portfolio: {
    method: 'get',
    access: 'common',
    params: ['portfolioId'],
    schema: schemas.getByPortfolio,
    handler: (session, request) => {
      const { user } = session;
      const { portfolioId } = request.params;

      return transactionService.findByPortfolio(user, portfolioId);
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
      const { type } = request.body;

      return transactionService.remove(type, user, id);
    },
  },
});
