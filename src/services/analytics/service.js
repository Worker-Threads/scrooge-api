/**
 * @typedef {import('./types').group} group
 * @typedef {import('./types').GroupCriteria} GroupCriteria
 * @typedef {import('./types').GroupFields} GroupFields
 * @typedef {Record<string | number, { entryVolume: number, currentVolume: number, profit: number }>} GroupMap
 */

import { exception } from '../../utils/exception/util.js';

/** @type {Record<GroupCriteria, GroupFields>} */
const groupingToField = {
  portfolio: 'portfolioId',
  type: 'type',
  asset: 'ticker',
};

/** @type {group} */
const group = (field, transactions) => {
  /** @type {Record<any, { entryVolume: number; currentVolume: number; profit: number }>} */
  const rawGroupMap = transactions.reduce((groupMap, transaction) => {
    const identifier = transaction[field];
    if (!groupMap[identifier])
      groupMap[identifier] = { entryVolume: 0, currentVolume: 0, profit: 0 };

    groupMap[identifier].entryVolume += transaction.entryVolume;
    groupMap[identifier].currentVolume += transaction.currentVolume;
    groupMap[identifier].profit += transaction.profit;

    return groupMap;
  }, /** @type {GroupMap} */ ({}));

  return Object.entries(rawGroupMap).map(([key, aggregated]) => {
    const { entryVolume, currentVolume, profit } = aggregated;
    const growth = ((currentVolume - entryVolume) / entryVolume) * 100;

    return {
      [field]: key,
      entryVolume,
      currentVolume,
      growth,
      profit,
    };
  });
};

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo, transactionRepo }) => ({
  getTransactionsTable: async (user, portfolioId, grouping) => {
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

    if (grouping) {
      const grouped = group(groupingToField[grouping], transactions);

      if (grouping === 'portfolio') {
        /** @type {Record<number, string>} */
        const portfolioTitles = portfolios.reduce(
          (map, { id, title }) => ({ ...map, [id]: title }),
          {},
        );

        grouped.forEach((row) => {
          if (row.portfolioId)
            row.portfolioTitle = portfolioTitles[row?.portfolioId];
        });
      }

      return grouped;
    }

    return transactions;
  },
});
