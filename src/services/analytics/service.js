import { verifyPortfolio } from '../helpers.js';
import { groupBy } from './helpers.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo, transactionRepo }) => ({
  async _getTransactionsList(user, portfolioId) {
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

    const transactions = await transactionRepo.getAnalyzedTransactions(
      portfolios.map(({ id }) => id),
    );

    return { portfolios, transactions };
  },

  async getHoldingsTable(user, { portfolioId, grouping }) {
    const { portfolios, transactions } = await this._getTransactionsList(
      user,
      portfolioId,
    );

    const grouped = grouping
      ? groupBy(grouping)(transactions, { portfolios })
      : transactions;

    return Object.values(grouped);
  },

  async getHoldingsDistribution(user, { portfolioId, grouping }) {
    const { portfolios, transactions } = await this._getTransactionsList(
      user,
      portfolioId,
    );

    const grouped = groupBy(grouping)(transactions, { portfolios });
    const totalVolume = Object.values(grouped).reduce(
      (volume, holding) => volume + holding.currentVolume,
      0,
    );

    return Object.fromEntries(
      Object.entries(grouped).map(([key, value]) => [
        key,
        (value.currentVolume / totalVolume) * 100,
      ]),
    );
  },
});
