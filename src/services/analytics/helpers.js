/**
 * @typedef {import('../../entities/ohlc').OHLC} OHLC
 * @typedef {import('../../types').AssetType} AssetType
 * @typedef {import('./types').GroupCriteria} GroupCriteria
 * @typedef {import('./types').groupByCriteria} groupByCriteria
 * @typedef {import('../../data/transaction/types').GeneralAnalytics} GeneralAnalytics
 * @typedef {import('../../data/transaction/types').AnalyzedTransaction} AnalyzedTransaction
 *
 * @typedef {Record<number, { amount: number; initialValue: number }>} HoldingsThroughTime
 */

/** @type {<T>(transactions: T[], identifierField: keyof T) => Record<string | number, T[]>} */
export const group = (transactions, identifierField) => {
  return transactions.reduce((map, transaction) => {
    const identifier = transaction[identifierField];

    if (!map[identifier]) map[identifier] = [];
    map[identifier].push(transaction);

    return map;
  }, /** @type {any} */ ({}));
};

/**
 * @param {GeneralAnalytics[]} transactions
 * @returns {GeneralAnalytics}
 */
const aggregate = (transactions) => {
  const aggregated = {
    amount: 0,
    initialValue: 0,
    currentValue: 0,
    profit: 0,
    growth: 0,
  };

  for (const transaction of transactions) {
    aggregated.amount += transaction.amount;
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
      /**
       * @type {Record<string, GeneralAnalytics & {
       *   ticker: string,
       *   avgEntryPrice: number,
       *   currentPrice: number
       * }>}
       */
      const result = {};

      for (const key in grouped) {
        const trs = grouped[key];
        const agg = aggregate(trs);
        const avgEntryPrice = agg.initialValue / agg.amount;
        const currentPrice = trs[0].currentPrice;

        result[key] = {
          ...agg,
          ticker: key,
          avgEntryPrice,
          currentPrice,
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

/**
 * @param {AnalyzedTransaction[]} transactions
 * @returns {HoldingsThroughTime}
 */
export const getAmountThroughTime = (transactions) => {
  let amount = 0;
  let initialValue = 0;

  const holdingsThroughTime = /** @type {HoldingsThroughTime} */ ({});

  transactions.forEach((t) => {
    amount += t.amount;
    initialValue += t.amount * (t.price ?? 0);

    holdingsThroughTime[t.timestamp] = {
      amount,
      initialValue,
    };
  });

  return holdingsThroughTime;
};

/**
 * @param {HoldingsThroughTime} holdingsThroughTime
 * @param {OHLC[]} bars
 * @returns {{
 * amount: number;
 * initialValue: number;
 * currentValue: number;
 * timestamp: number;
 * }[]}
 */
export const getValueThroughTime = (holdingsThroughTime, bars) => {
  const timestamps = Object.keys(holdingsThroughTime).map((ts) => parseInt(ts));
  const values = bars.map(({ timestamp, close }) => {
    for (let i = timestamps.length - 1; i >= 0; i--) {
      if (timestamp >= timestamps[i]) {
        const { amount, initialValue } = holdingsThroughTime[timestamps[i]];
        const currentValue = amount * close;

        return {
          amount,
          initialValue,
          currentValue,
          timestamp,
        };
      }
    }
  });

  return values.filter((v) => !!v);
};
