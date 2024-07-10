import { verifyPortfolio } from '../helpers.js';
import { groupBy } from './helpers.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo, transactionRepo }) => ({
  getHoldingsTable: async (user, { portfolioId, grouping }) => {
    const { id: userId } = user;
    const portfolios = [];

    if (portfolioId) {
      const portfolio = await portfolioRepo.findOne({ id: portfolioId });
      const verifiedPortfolio = verifyPortfolio(user, portfolio);
      portfolios.push(verifiedPortfolio);
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
