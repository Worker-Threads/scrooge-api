import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ analyticsService }) => ({
  general: {
    method: 'get',
    access: 'common',
    schema: schemas.general,
    handler: async (session, request) => {
      const { user } = session;
      const aggregated = await analyticsService.getHoldingsTable(user, {
        grouping: '*',
      });

      return aggregated.length ? aggregated[0] : null;
    },
  },

  table: {
    method: 'get',
    access: 'common',
    schema: schemas.table,
    handler: (session, request) => {
      const { user } = session;
      const { portfolioId, grouping } = request.query;

      return analyticsService.getHoldingsTable(user, { portfolioId, grouping });
    },
  },

  allocation: {
    method: 'get',
    access: 'common',
    schema: schemas.table,
    handler: (session, request) => {
      const { user } = session;
      const { portfolioId, grouping } = request.query;

      return analyticsService.getHoldingsDistribution(user, {
        portfolioId,
        grouping: grouping ?? 'portfolio',
      });
    },
  },
});
