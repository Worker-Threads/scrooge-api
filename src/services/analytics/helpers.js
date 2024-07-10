/**
 * @typedef {import('../../types').AssetType} AssetType
 * @typedef {import('./types').GroupCriteria} GroupCriteria
 * @typedef {import('./types').GroupByCriteriaFn} GroupByCriteriaFn
 * @typedef {import('../../data/transaction/types').AggTransaction} AggTransaction
 */

/** @type {import('./types').group} */
const group = (transactions, identifierField) => {
  return transactions.reduce((map, transaction) => {
    const identifier = transaction[identifierField];

    if (!map[identifier]) map[identifier] = [];
    map[identifier].push(transaction);

    return map;
  }, /** @type {Record<string | number, AggTransaction[]>} */ ({}));
};

/** @type {import('./types').aggregate} */
const aggregate = (transactions) => {
  const aggregated = { entryVolume: 0, currentVolume: 0, profit: 0, growth: 0 };

  for (const transaction of transactions) {
    aggregated.entryVolume += transaction.entryVolume;
    aggregated.currentVolume += transaction.currentVolume;
    aggregated.profit += transaction.profit;
  }

  return {
    ...aggregated,
    growth: (aggregated.profit / aggregated.entryVolume) * 100,
  };
};

/** @type {Record<GroupCriteria, GroupByCriteriaFn>} */
const groupByCriteriaMap = {
  '*': (transactions) => {
    return { '*': aggregate(transactions) };
  },

  portfolio: (transactions, { portfolios }) => {
    const grouped = group(transactions, 'portfolioId');
    /** @type {Record<string, Partial<AggTransaction>>} */
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
    /** @type {Record<string, Partial<AggTransaction>>} */
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
    /** @type {Record<string, Partial<AggTransaction>>} */
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

      return { ...t, timestamp: new Date(`${year}-${month}-${day}`).getTime() };
    });

    const grouped = group(trsWithMonth, 'timestamp');
    /** @type {Record<string, Partial<AggTransaction>>} */
    const result = {};

    for (const key in grouped) {
      const trs = grouped[key];
      const agg = aggregate(trs);

      result[key] = { ...agg, timestamp: +key };
    }

    return result;
  },
};

/** @type {import('./types').GroupBy} */
export const groupBy = (criteria) => groupByCriteriaMap[criteria];
