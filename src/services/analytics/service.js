import { exception } from '../../utils/exception/util.js';
import { groupBy } from './helpers.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo, transactionRepo }) => ({
  getHoldingsTable: async (user, { portfolioId, grouping }) => {
    const { id: userId } = user;
    const portfolios = [];

    if (portfolioId) {
      const portfolio = await portfolioRepo.findOne({ id: portfolioId });
      if (!portfolio) throw exception.notFound('Portfolio not found');
      if (portfolio.userId !== userId)
        throw exception.forbidden('User has no access to this portfolio');

      portfolios.push(portfolio);
    } else {
      const userPortfolios = await portfolioRepo.find({ userId });

      portfolios.push(...userPortfolios);
    }

    const transactions = await transactionRepo.getWithProfit(
      portfolios.map(({ id }) => id),
    );

    return grouping
      ? groupBy(grouping)(transactions, { portfolios })
      : transactions;
  },
});
