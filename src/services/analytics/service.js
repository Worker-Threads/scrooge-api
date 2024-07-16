/** @typedef {import('./helpers.js').GeneralAnalytics} GeneralAnalytics */

import { verifyPortfolio } from '../helpers.js';
import { groupBy, group } from './helpers.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo, transactionRepo, barRepo }) => ({
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
    /** @type {Record<string, string>} */
    const distributionGrouping = {
      portfolio: 'portfolioTitle',
      asset: 'ticker',
      type: 'type',
      date: 'timestamp',
    };

    const group = /** @type {keyof GeneralAnalytics} */ (
      distributionGrouping[grouping]
    );

    const { portfolios, transactions } = await this._getTransactionsList(
      user,
      portfolioId,
    );

    const grouped = groupBy(grouping)(transactions, { portfolios });
    const totalValue = Object.values(grouped).reduce(
      (value, holding) => value + holding.currentValue,
      0,
    );

    return Object.fromEntries(
      Object.entries(grouped).map(([_key, value]) => [
        value[group],
        (value.currentValue / totalValue) * 100,
      ]),
    );
  },

  async get24hGainList(user, portfolioId) {
    const { transactions, portfolios } = await this._getTransactionsList(
      user,
      portfolioId,
    );
    const tickerHoldingMap = groupBy('asset')(transactions, { portfolios });
    const tickers = Object.keys(tickerHoldingMap);
    const tickers24hGain = await barRepo.get24hChange(tickers);
    const ticker24hGainMap = group(tickers24hGain, 'ticker');

    return Object.entries(ticker24hGainMap).map(([ticker, analytics]) => {
      const amount = tickerHoldingMap[ticker].amount;
      const tickerAnalytics = analytics[0];
      const previousValue = amount * tickerAnalytics.previousPrice;
      const currentValue = amount * tickerAnalytics.currentPrice;

      return {
        ticker,
        amount,
        value: currentValue,
        gain24h: tickerAnalytics.gain24h,
        profit: currentValue - previousValue,
      };
    });
  },
});
