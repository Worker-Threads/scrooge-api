/**
 * @typedef {import('../../data/transaction/types').GeneralAnalytics} GeneralAnalytics
 * @typedef {import('../../types').AssetType} AssetType
 * @typedef {import('./types').LineChartAnalytics} LineChartAnalytics
 * @typedef {import('./types').GroupedLineChartAnalytics} GroupedLineChartAnalytics
 */

import { verifyPortfolio } from '../helpers.js';
import {
  groupBy,
  group,
  getAmountThroughTime,
  getValueThroughTime,
} from './helpers.js';

/** @type {Record<string, string>} */
const assetGrouping = {
  portfolio: 'portfolioTitle',
  asset: 'ticker',
  type: 'type',
  date: 'timestamp',
};

/** @type {import('./types.d.ts').init} */
export const init = ({ portfolioRepo, transactionRepo, barRepo }) => ({
  async _getPortfolios(user, portfolioId) {
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

    return portfolios;
  },

  async _getTransactionsList(user, portfolioId) {
    const portfolios = await this._getPortfolios(user, portfolioId);

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
    const group = /** @type {keyof GeneralAnalytics} */ (
      assetGrouping[grouping]
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

  async _getAssetLineChart(portfolio, schema, symbol) {
    const transactions = await transactionRepo.getAnalyzedForTicker(
      portfolio.id,
      schema,
      symbol,
    );

    if (!transactions.length) return [];

    const holdingsThroughTime = getAmountThroughTime(transactions);
    const bars = await barRepo.getFilledHistory(
      schema,
      symbol,
      transactions[0].timestamp,
    );

    return getValueThroughTime(holdingsThroughTime, bars).map((el) => ({
      ...el,
      portfolioTitle: portfolio.title,
      type: schema,
      ticker: symbol,
    }));
  },

  async getLineChart(user, { portfolioId, grouping }) {
    const portfolios = await this._getPortfolios(user, portfolioId);

    const promises = /** @type {Promise<LineChartAnalytics[]>[]} */ ([]);

    await Promise.all(
      portfolios.map(async (portfolio) => {
        const tickersByType = await transactionRepo.getPortfolioTickers(
          portfolio.id,
        );
        for (const key in tickersByType) {
          const type = /** @type {AssetType} */ (key);
          for (const ticker of tickersByType[type]) {
            promises.push(this._getAssetLineChart(portfolio, type, ticker));
          }
        }
      }),
    );

    const chart = (await Promise.all(promises)).flat();

    const grouped = grouping
      ? group(
          chart,
          /** @type {keyof LineChartAnalytics} */ (assetGrouping[grouping]),
        )
      : { all: chart };

    const result =
      /** @type {Record<string, (GroupedLineChartAnalytics & GeneralAnalytics)[]>} */ ({});

    for (const key in grouped) {
      const holdings = grouped[key];
      const holdingsByTimestamp =
        /** @type {Record<number, GroupedLineChartAnalytics>} */ ({});

      for (const holding of holdings) {
        if (!holdingsByTimestamp[holding.timestamp]) {
          holdingsByTimestamp[holding.timestamp] = {
            amount: 0,
            initialValue: 0,
            currentValue: 0,
            timestamp: holding.timestamp,
          };
        }

        const holdingByTimestamp = holdingsByTimestamp[holding.timestamp];

        holdingByTimestamp.amount += holding.amount;
        holdingByTimestamp.initialValue += holding.initialValue;
        holdingByTimestamp.currentValue += holding.currentValue;
      }

      result[key] = Object.values(holdingsByTimestamp).map((el) => {
        const { amount, initialValue, currentValue, timestamp } = el;

        const index = currentValue / initialValue;
        const growth = currentValue - initialValue;
        const profit = growth / initialValue;

        return {
          amount,
          initialValue,
          currentValue,
          index,
          growth,
          profit,
          timestamp,
        };
      });
    }

    return result;
  },
});
