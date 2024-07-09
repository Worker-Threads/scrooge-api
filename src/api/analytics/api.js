import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ analyticsService }) => ({
  table: {
    method: 'get',
    access: 'common',
    schema: schemas.table,
    handler: (session, request) => {
      const { user } = session;
      const { portfolioId, grouping } = request.query;

      return analyticsService.getTransactionsTable(user, portfolioId, grouping);
    },
  },
});
