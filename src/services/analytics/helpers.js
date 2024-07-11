/**
 * @typedef {import('../../types').AssetType} AssetType
 * @typedef {import('./types').GroupFields} GroupFields
 * @typedef {import('./types').GroupCriteria} GroupCriteria
 * @typedef {import('./types').groupByCriteria} groupByCriteria
 * @typedef {import('../../data/transaction/types').GeneralAnalytics} GeneralAnalytics
 * @typedef {import('../../data/transaction/types').AnalyzedTransaction} AnalyzedTransaction
 */

/**
 * @param {GroupFields} identifierField
 * @param {AnalyzedTransaction[]} transactions
 */
const group = (transactions, identifierField) => {
  return transactions.reduce((map, transaction) => {
    const identifier = transaction[identifierField];

    if (!map[identifier]) map[identifier] = [];
    map[identifier].push(transaction);

    return map;
  }, /** @type {Record<string | number, AnalyzedTransaction[]>} */ ({}));
};

/**
 * @param {GeneralAnalytics[]} transactions
 * @returns {GeneralAnalytics}
 */
const aggregate = (transactions) => {
  const aggregated = { initialValue: 0, currentValue: 0, profit: 0, growth: 0 };

  for (const transaction of transactions) {
    aggregated.initialValue += transaction.initialValue;
    aggregated.currentValue += transaction.currentValue;
    aggregated.profit += transaction.profit;
  }

  return {
    ...aggregated,
    growth: (aggregated.profit / aggregated.initialValue) * 100,
  };
};

/** @param {GroupCriteria} criteria */
export const groupBy = (criteria) =>
  /** @type {Record<GroupCriteria, groupByCriteria>} */
  ({
    all: (transactions) => {
      const aggregated = aggregate(transactions);

      return { all: aggregated };
    },

    portfolio: (transactions, { portfolios }) => {
      const grouped = group(transactions, 'portfolioId');
      /** @type {Record<string, GeneralAnalytics & { portfolioId: number, portfolioTitle: string }>} */
      const result = {};

      /** @type {Record<number, string>} */
      const portfolioTitles = portfolios.reduce(
        (map, { id, title }) => ({ ...map, [id]: title }),
        {},
      );

      for (const key in grouped) {
        const trs = grouped[key];
        const agg = aggregate(trs);
        const portfolioId = +key;

        result[key] = {
          ...agg,
          portfolioId,
          portfolioTitle: portfolioTitles[portfolioId],
        };
      }

      return result;
    },

    asset: (transactions) => {
      const grouped = group(transactions, 'ticker');
      /** @type {Record<string, GeneralAnalytics & { ticker: string }>} */
      const result = {};

      for (const key in grouped) {
        const trs = grouped[key];
        const agg = aggregate(trs);

        result[key] = {
          ...agg,
          ticker: key,
        };
      }

      return result;
    },

    type: (transactions) => {
      const grouped = group(transactions, 'type');
      /** @type {Record<string, GeneralAnalytics & { type: string }>} */
      const result = {};

      for (const key in grouped) {
        const trs = grouped[key];
        const agg = aggregate(trs);
        const typedKey = /** @type {AssetType} */ (key);

        result[key] = {
          ...agg,
          type: typedKey,
        };
      }

      return result;
    },

    date: (transactions) => {
      const trsWithMonth = transactions.map((t) => {
        const date = new Date(t.timestamp);
        const month = date.getUTCMonth() + 1; // js month starts with 0
        const year = date.getUTCFullYear();
        const day = 15; // WARN! Possible Timezone issues

        return {
          ...t,
          timestamp: new Date(`${year}-${month}-${day}`).getTime(),
        };
      });

      const grouped = group(trsWithMonth, 'timestamp');
      /** @type {Record<string, GeneralAnalytics & { timestamp: number }>} */
      const result = {};

      for (const key in grouped) {
        const trs = grouped[key];
        const agg = aggregate(trs);

        result[key] = { ...agg, timestamp: +key };
      }

      return result;
    },
  })[criteria];
