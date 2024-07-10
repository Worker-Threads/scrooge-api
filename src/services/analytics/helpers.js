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
    return [aggregate(transactions)];
  },

  portfolio: (transactions, { portfolios }) => {
    const grouped = group(transactions, 'portfolioId');

    /** @type {Record<number, string>} */
    const portfolioTitles = portfolios.reduce(
      (map, { id, title }) => ({ ...map, [id]: title }),
      {},
    );

    return Object.entries(grouped).map(([key, trs]) => {
      const agg = aggregate(trs);
      const portfolioId = +key;

      return {
        portfolioId,
        portfolioTitle: portfolioTitles[portfolioId],
        ...agg,
      };
    });
  },

  asset: (transactions) => {
    const grouped = group(transactions, 'ticker');

    return Object.entries(grouped).map(([key, trs]) => {
      const agg = aggregate(trs);

      return {
        ticker: key,
        ...agg,
      };
    });
  },

  type: (transactions) => {
    const grouped = group(transactions, 'type');

    return Object.entries(grouped).map(([key, trs]) => {
      const agg = aggregate(trs);
      const typedKey = /** @type {AssetType} */ (key);

      return {
        type: typedKey,
        ...agg,
      };
    });
  },

  date: (transactions) => {
    const trsWithMonth = transactions.map((t) => {
      const date = new Date(t.timestamp);
      const month = date.getUTCMonth() + 1; // js month starts with 0
      const year = date.getUTCFullYear();
      const day = 15; // WARN! Possible Timezone issues

      const timestamp = new Date(`${year}-${month}-${day}`).getTime();

      return {
        ...t,
        timestamp,
      };
    });

    const grouped = group(trsWithMonth, 'timestamp');

    return Object.entries(grouped).map(([key, trs]) => {
      const agg = aggregate(trs);

      return {
        ...agg,
        timestamp: +key,
      };
    });
  },
};

/** @type {import('./types').GroupBy} */
export const groupBy = (criteria) => groupByCriteriaMap[criteria];
